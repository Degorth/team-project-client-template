var express = require('express');
var app = express();
const path = require('path')
var database = require('./database.js');
var bodyParser = require('body-parser');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var getCollection = database.getCollection;
var validate = require('express-jsonschema').validate;
var EventSchema = require('./schemas/eventSchema.json');
var SearchSchema = require('./schemas/searchSchema.json');
var UserSchema = require('./schemas/userSchema.json');

//import static stuff
app.use(express.static('../client/build'));
// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());

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
        // Check that id is a number.
        if (typeof id === 'number') {
            return id;
        } else {
            // Not a number. Return -1, an invalid ID.
            return -1;
        }
    } catch (e) {
        // Return an invalid ID.
        return -1;
    }
}

//gets name and email for event organizer
function getEventOwnerInfoForEvent(event_obj) {
    var eventOwner = readDocument('Users', event_obj.owner);
    event_obj.owner = {
        "name": "",
        "email": ""
    }
    event_obj.owner.name = eventOwner.name;
    event_obj.owner.email = eventOwner.email;
    return event_obj;
}
/**
User Authentication Protocol
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNum = parseInt(userid, 10);
    if (fromUser === useridNum) {
        res.send(ret);
    } else {
        res.status(401).end();
    }
*/

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

app.get('/user/:userid/schedule', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNum = parseInt(userid, 10);
    if (fromUser === useridNum) {
        var userData = readDocument('Users', useridNum);
        var events = userData.events.map((event_id) => readDocument('Events', event_id));
        res.send(events);
    } else {
        res.status(401).end();
    }
});

app.get('/event/:eventid/user/:userid', function(req, res) {
    var userid = req.params.userid;
    var eventid = req.params.eventid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNum = parseInt(userid, 10);
    var eventidNum = parseInt(eventid, 10);
    if (fromUser === useridNum) {
        var ev = readDocument('Events', eventidNum);
        ev = getEventOwnerInfoForEvent(ev);
        res.send(ev);
    } else {
        res.status(401).end();
    }
});

app.get('/user/:userid', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNum = parseInt(userid, 10);
    if (fromUser === useridNum) {
        res.send(readDocument('Users', userid));
    } else {
        res.status(401).end();
    }
});

app.get('/user/:userid/event/:eventid/isAttending', function(req, res) {
    var userid = req.params.userid;
    var eventid = req.params.eventid;
    var eventidNum = parseInt(eventid, 10);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNum = parseInt(userid, 10);
    if (fromUser === useridNum) {
        var userData = readDocument('Users', useridNum);
        res.send(userData.events.indexOf(eventidNum) >= 0);
    } else {
        res.status(401).end();
    }
});

app.put('/user/:userid', validate({ body: UserSchema }), function(req, res) {
  var userid = req.params.userid;
  var useridNum = parseInt(userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === useridNum) {
    var user = readDocument('Users', userid);
    user.name = req.body.name;
    user.email = req.body.email;
    user.interests = req.body.interests;
    writeDocument('Users', user);
    res.send();
  }
  else {
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
        if (userData.events.indexOf(eventidNum) >= 0){
          userData.events.splice(userData.events.indexOf(eventidNum),1);
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
    var useridNum = parseInt(userid, 10);
    if (fromUser === useridNum) {
        var userData = readDocument('Users', useridNum);
        var groups = userData.groups.map((group_id) => readDocument('Groups', group_id));
        res.send(groups);
    } else {
        res.status(401).end();
    }
});

app.get('/groups',function(req,res){
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
    database.resetDatabase();
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
})
