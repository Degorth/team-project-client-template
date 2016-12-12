var express = require('express');
var app = express();
const path = require('path')
var database = require('./database.js');
var reset = require('./resetdatabase.js');
var bodyParser = require('body-parser');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var getCollection = database.getCollection;
var validate = require('express-jsonschema').validate;
var EventSchema = require('./schemas/eventSchema.json');
var SearchSchema = require('./schemas/searchSchema.json');
var UserSchema = require('./schemas/userSchema.json');
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/ugo';

MongoClient.connect(url, function(err, db) {
    //import static stuff
    app.use(express.static('../client/build'));
    // Support receiving text in HTTP request bodies
    app.use(bodyParser.text());
    // Support receiving JSON in HTTP request bodies
    app.use(bodyParser.json());

    app.use('/mongo_express', mongo_express(mongo_express_config));

    // Starts the server on port 3000!
    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });

    function getUserIdFromToken(authorizationLine) {
        try {
            // Cut off "Bearer " from the header value.
            var token = authorizationLine.slice(7);
            // Convert the base64 string to a UTF-8 string.
            var regularString = new Buffer(token, 'base64').toString('utf8');
            // Convert the UTF-8 string into a JavaScript object.
            var tokenObj = JSON.parse(regularString);
            var id = tokenObj['id'];
            // Check that id is a string.
            if (typeof id === 'string') {
                return id;
            } else {
                // Not a string.
                return "";
            }
        } catch (e) {
            // Return an invalid ID.
            return "";
        }
    }

    function sendDatabaseError(res, err) {
        res.status(500).send("A database error occurred: " + err);
    }

    //gets name and email for event organizer
    function getEventOwnerInfoForEvent(event_obj, callback) {
        if (event_obj === undefined) {
            callback(null, {});
        } else {
            var ownerObject = new ObjectID(event_obj.owner);
            db.collection('Users').findOne({
                _id: ownerObject
            }, function(err, eventOwner) {
                if (err) {
                    return callback(err);
                } else {
                    event_obj.owner = {
                        "name": "",
                        "email": ""
                    }
                    event_obj.owner.name = eventOwner.name;
                    event_obj.owner.email = eventOwner.email;
                    return callback(null, event_obj);
                }
            });
        }
    }

    app.post('/event/:eventid', validate({body: EventSchema}), function(req, res) {
        //This Function takes an event JSON and writes it to the server. See Eventscreat.js
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        var useridNum = parseInt(userid, 10);
        if (fromUser === useridNum) {
            var newEvent = req.params.body;
            var blankEvent = {
                data: {
                    eventName: "",
                    organizer: "",
                    loc: "",
                    onetime: "",
                    datetime: "",
                    reoccuring: "",
                    weekday: "",
                    time: "",
                    desc: "",
                    contactInfo: ""
                }
            };
            addDocument('Events', newEvent);
            // Fetch the associated group
            var groupData = readDocument('Groups', newEvent.organizer);
            // add the new event to the group Data
            groupData.events.unshift(newEvent._id);
            // Write back to the document the new group data
            writeDocument('Groups', groupData);
            res.send(blankEvent);
        } else {
            res.status(401).end();
        }

    });

    app.post('/search*/', validate({body: SearchSchema}), function(req, res) {
        //var user_id = req.params.userid;
        //var event_id = req.params.eventid;
        var unfiltered_results = [];
        var searchField = req.body.searchInput.trim().toLowerCase();
        //var userData = readDocument('Users', user_id);
        //var user_events = userData.events.map((event_id) => readDocument('Events', event_id));
        var all_events = getCollection('Events');
        var length = Object.keys(all_events).length;
        for (var i = 1; i < length; i++) {
            if (all_events[i].name.toLowerCase().includes(searchField)) {
                unfiltered_results.push(all_events[i]);
            }
        }
        /* Before and after not yet implemented
      for (var i=1 ; i < length; i++)
      {
      if (all_events[i].name.toLowerCase().includes(searchField) ||
        all_events[i].days.includes(days) ||
        all_events[i].after >= after ||
        (all_events[i].after + all_events[i].length) < before)
        {
          unfiltered_results.push(all_events[i]);
        }

      }
      */
        res.send(unfiltered_results);
    });

    function resolveEventObjects(eventList, callback) {
        if (eventList.length === 0) {
            callback(null, {});
        } else {
            var query = {
                $or: eventList.map((id) => {
                    return {_id: id}
                })
            };
            db.collection('Events').find(query).toArray(function(err, events) {
                if (err) {
                    return callback(err);
                }
                var eventArray = [];
                events.forEach((event) => {
                    eventArray.push(event);
                });
                callback(null, eventArray);
            });
        }
    }

    app.get('/user/:userid/schedule', function(req, res) {
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            var userObject = new ObjectID(userid);
            db.collection('Users').findOne({
                _id: userObject
            }, function(err, userData) {
                if (err) {
                    throw err;
                } else {
                    resolveEventObjects(userData.events, function(err, eventMap) {
                        if (err) {
                            return sendDatabaseError(res, err);
                        }
                        res.send(eventMap);
                    });
                }
            });
        } else {
            res.status(401).end();
        }
        /*
      var userid = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var useridNum = parseInt(userid, 10);
      if (fromUser === userid) {
          var userData = readDocument('Users', useridNum);
          var events = userData.events.map((event_id) => readDocument('Events', event_id));
          res.send(events);
      } else {
          res.status(401).end();
      }
      */
    });

    app.get('/event/:eventid/user/:userid', function(req, res) {
        var userid = req.params.userid;
        var eventid = req.params.eventid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            var eventObject = new ObjectID(eventid);
            db.collection('Events').findOne({
                _id: eventObject
            }, function(err, eventData) {
                if (err) {
                    throw err;
                } else {
                  getEventOwnerInfoForEvent(eventData, function(err, modifiedEvent) {
                    res.send(modifiedEvent);
                  })
                }
            });
        } else {
            res.status(401).end();
        }
    });

    app.get('/user/:userid', function(req, res) {
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            var userObject = new ObjectID(userid);
            db.collection('Users').findOne({
                _id: userObject
            }, function(err, userData) {
                if (err) {
                    throw err;
                } else {
                    res.send(userData);
                }
            });
        } else {
            res.status(401).end();
        }
    });

    app.get('/user/:userid/event/:eventid/isAttending', function(req, res) {
        var userid = req.params.userid;
        var eventid = req.params.eventid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            var userObject = new ObjectID(userid);
            db.collection('Users').findOne({
                _id: userObject
            }, function(err, userData) {
                if (err) {
                    throw err;
                } else {
                    var search = userData.events.find((evId) => (evId.toString() === eventid));
                    if (search !== undefined) {
                        res.send(search.toString() === eventid);
                    } else {
                        res.send(false);
                    }
                }
            });
        } else {
            res.status(401).end();
        }
    });

    app.put('/user/:userid', validate({body: UserSchema}), function(req, res) {
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            db.collection('Users').updateOne({
                _id: new ObjectID(userid)
            }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    interests: req.body.interests
                }
            }, function(err) {
                if (err) {
                    throw err;
                } else {
                    res.send();
                }
            });
        } else {
            res.status(401).end();
        }
    });

    app.put('/user/:userid/event/:eventid', function(req, res) {
        var userid = req.params.userid;
        var eventid = req.params.eventid;
        var eventidNum = parseInt(eventid, 10);
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        var useridNum = parseInt(userid, 10);
        if (fromUser === useridNum) {
            var userData = readDocument('Users', useridNum);
            if (userData.events.indexOf(eventidNum) < 0)
                userData.events.push(eventidNum);
            writeDocument('Users', userData);
            res.send(userData);
        } else {
            res.status(401).end();
        }
    });
    app.delete('/user/:userid/event/:eventid', function(req, res) {
        var userid = req.params.userid;
        var eventid = req.params.eventid;
        var eventidNum = parseInt(eventid, 10);
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        var useridNum = parseInt(userid, 10);
        if (fromUser === useridNum) {
            var userData = readDocument('Users', useridNum);
            if (userData.events.indexOf(eventidNum) >= 0) {
                userData.events.splice(userData.events.indexOf(eventidNum), 1);
            }
            writeDocument('Users', userData);
            res.send(userData);
        } else {
            res.status(401).end();
        }
    });

    app.get('/user/:userid/upcoming', function(req, res) {
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        var useridNum = parseInt(userid, 10);
        if (fromUser === useridNum) {
            var number = 5;
            var i = 1;
            var result = [];
            var eventData;
            var userData = readDocument('Users', userid);
            while (i < number) {
                eventData = readDocument('Events', i);
                result.push(eventData);
                i = i + 1;
            }
            result = result.filter((ev) => (userData.events.indexOf(ev._id) < 0));
            result.forEach((ev) => getEventOwnerInfoForEvent(ev));
            res.send(result);
        } else {
            res.status(401).end();
        }
    });

    app.get('/user/:userid/groups', function(req, res) {
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            db.collection('Users').findOne({
                _id: new ObjectID(userid)
            }, function(err, userData) {
                if (err) {
                    throw err;
                } else {
                    //console.log("User groups: " + userData.groups.toString());
                    db.collection('Groups').find({
                        _id: {
                            $in: userData.groups
                        },
                        function(err, groups) {
                            if (err) {
                                throw err;
                            } else {
                                //console.log("" + groups.toString());
                                res.send(groups);
                            }
                        }
                    });
                    //userData = readDocument('Users', useridNum);
                    //var groups = userData.groups.map((group_id) => readDocument('Groups', group_id));
                    //res.send(groups);
                }
            });

        } else {
            res.status(401).end();
        }
    });

    app.get('/groups', function(req, res) {
        var groups = getCollection("Groups");
        var groupsAsArray = [];
        for (var i = 0; i < groups.length; i++) {
            groupsAsArray[i] = groups[i]._id
        }
        res.send(groupsAsArray);
    });

    // Reset database.
    app.post('/resetdb', function(req, res) {
        console.log("Resetting database...");
        // This is a debug route, so don't do any validation.
        reset(db, function(err) {
            if (err) {
                throw err;
            } else {
                res.status(200);
            }
        });
        // res.send() sends an empty response with status code 200
        res.send();
    });

    //THIS MUST BE THE LAST function
    /***
  THIS FUNCTION CATCHES ALL UNDEFINED PATHS AND ROUTES IT TO THE MAIN PAGE
  PLACING FUNCTIONS BEFORE THIS ONE WILL LEAD TO UNDESIRED RESULTS
  *
  *
  *
  *
  *
  *
  *
  *
  *
  *
  *
  *
  *
  *
  *
  */
    app.get('*', function(req, res) {
        res.sendFile(path.resolve('../client/', 'build', 'index.html'))
    });
});
