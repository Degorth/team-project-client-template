var express = require('express');
var app = express();
const path = require('path')
var database = require('./database.js');
var bodyParser = require('body-parser');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var validate = require('express-jsonschema').validate;

//import static stuff
app.use(express.static('../client/build'));

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
    var eventidNum = parseInt(eventid,10);
    if (fromUser === useridNum) {
        var ev = readDocument('Events', eventidNum);
        var eventOwner = readDocument('Users',ev.owner);
        ev.owner = {
          "name":"",
          "email":""
        }
        ev.owner.name = eventOwner.name;
        ev.owner.email = eventOwner.email;
        res.send(ev);
    } else {
        res.status(401).end();
    }
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
app.get('*', function (req, res){
    res.sendFile(path.resolve('../client/', 'build', 'index.html'))
})
