var express = require('express');
var app = express();
const path = require('path')
var reset = require('./resetdatabase.js');
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var EventSchema = require('./schemas/eventSchema.json');
var SearchSchema = require('./schemas/searchSchema.json');
var UserSchema = require('./schemas/userSchema.json');
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var fs = require('fs');
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

    function postNewEvent(newEvent, callback) {
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

        db.collection('Events').insertOne(blankEvent, function(err, result) {
            if (err) {
                return callback(err);
            }

            blankEvent._id = result.insertedId;

            callback(null, blankEvent);
        });
    }

    app.post('/event/:eventid', validate({body: EventSchema}), function(req, res) {
        //This Function takes an event JSON and writes it to the server. See Eventscreat.js
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            postNewEvent(req.params.body, function(err, blankEvent) {
                if (err) {
                    return sendDatabaseError(res, err);
                }
                res.send(blankEvent);
            });
        } else {
            res.status(401).end();
        }
    });

    app.post('/search*/', validate({body: SearchSchema}), function(req, res) {
        db.collection('Events').find({
            $text: {
                $search: req.body.searchInput.trim(),
                $caseSensitive: false
            }
        }).toArray(function(err, eventList) {
            if (err) {
                sendDatabaseError(res, err);
            }
            if (eventList === undefined) {
                res.send([]);
            }
            res.send(eventList);
        });
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
                var modifiedCount = 0;
                var modifiedResults = [];
                events.forEach((event) => getEventOwnerInfoForEvent(event, function(err, modifiedEvent) {
                    if (err) {
                        return callback(err, null);
                    }
                    modifiedCount++;
                    modifiedResults.push(modifiedEvent);
                    if (modifiedCount === events.length) {
                        return callback(null, modifiedResults);
                    }
                }));
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
                    return sendDatabaseError(res, err);
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
                    return sendDatabaseError(res, err);
                } else {
                    res.send(userData.events.find((evId) => (evId.toString() === eventid)) !== undefined);
                }
            });
        } else {
            res.status(401).end();
        }
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
                    return sendDatabaseError(res, err);
                } else {
                    getEventOwnerInfoForEvent(eventData, function(err, modifiedEvent) {
                        if (err) {
                            return sendDatabaseError(res, err);
                        }
                        res.send(modifiedEvent);
                    })
                }
            });
        } else {
            res.status(401).end();
        }
    });

    app.get('/event/:eventid/user/:userid/photo', function(req, res) {
        var eventid = req.params.eventid;
        var eventObject = new ObjectID(eventid);
        db.collection('Events').findOne({
            _id: eventObject
        }, function(err, eventData) {
            if (err) {
                return sendDatabaseError(res, err);
            }
            var fileToLoad = fs.readFileSync("./" + eventData.photo);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(fileToLoad, 'binary');
        });
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
                    return sendDatabaseError(res, err);
                } else {
                    res.send(userData);
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
                    return sendDatabaseError(res, err);
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
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            var userIDObj = new ObjectID(userid);
            db.collection('Users').updateOne({
                _id: userIDObj
            }, {
                $addToSet: {
                    events: new ObjectID(eventid)
                }
            }, function(err) {
                if (err) {
                    return sendDatabaseError(res, err);
                }
                db.collection('Users').findOne({
                    _id: userIDObj
                }, function(err, userData) {
                    if (err) {
                        return sendDatabaseError(res, err);
                    }
                    res.send(userData);
                });
            });
        } else {
            res.status(401).end();
        }
    });

    app.delete('/user/:userid/event/:eventid', function(req, res) {
        var userid = req.params.userid;
        var eventid = req.params.eventid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            var userIDObj = new ObjectID(userid);
            db.collection('Users').updateOne({
                _id: userIDObj
            }, {
                $pull: {
                    events: new ObjectID(eventid)
                }
            }, function(err) {
                if (err) {
                    return sendDatabaseError(res, err);
                }
                db.collection('Users').findOne({
                    _id: userIDObj
                }, function(err, userData) {
                    if (err) {
                        return sendDatabaseError(res, err);
                    }
                    res.send(userData);
                });
            });
        } else {
            res.status(401).end();
        }
    });

    app.get('/user/:userid/upcoming', function(req, res) {
        var userid = req.params.userid;
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        if (fromUser === userid) {
            var userObject = new ObjectID(userid);
            db.collection('Users').findOne({
                _id: userObject
            }, function(err, userData) {
                if (err) {
                    return sendDatabaseError(res, err);
                } else {
                    db.collection('Events').find({
                        _id: {
                            $nin: userData.events
                        }
                    }).toArray(function(err, eventList) {
                        if (err) {
                            return sendDatabaseError(res, err);
                        }
                        var result = eventList.filter((ev) => (userData.events.indexOf(ev._id) < 0));
                        var modifiedCount = 0;
                        var modifiedResults = [];
                        result.forEach((event) => getEventOwnerInfoForEvent(event, function(err, modifiedEvent) {
                            if (err) {
                                return sendDatabaseError(res, err);
                            }
                            modifiedCount++;
                            modifiedResults.push(modifiedEvent);
                            if (modifiedCount === result.length) {
                                res.send(modifiedResults);
                            }
                        }));
                    });
                }
            });
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
                    return sendDatabaseError(res, err);
                } else {
                    db.collection('Groups').find({
                        _id: {
                            $in: userData.groups
                        }
                    }).toArray(function(err, groups) {
                        if (err) {
                            throw err;
                        } else {
                            //console.log("" + groups.toString());
                            res.send(groups);
                        }
                    });
                }
            });

        } else {
            res.status(401).end();
        }
    });

    app.get('/groups', function(req, res) {
        db.collection('Groups').find({}).toArray(function(err, groups) {
            if (err) {
                throw err;
            } else {
                //console.log("" + groups.toString());
                res.send(groups);
            }
        });
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
