var ObjectID = require('mongodb').ObjectID;

var databaseName = "facebook";
// Put the initial mock objects here.
var initialData = {
  "Events": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "days": ["Mon","Wed","Fri"],
      "name": "Umass Shotokan Karate Club",
      "desc": "The Umass Shotokan Karate Club is a long standing branch of the Internation Shotokan Karate Federation. We are the 6th club founded though the organization in the United States and have been at this university for over 40 years!",
      "owner": new ObjectID("000000000000000000000001"), // the group that owns this event
      "loc": "Boyden Gym Basement Squash Courts",
      "start": new Date().getTime() + 7200000, //1478803334000
      "length": 7200000
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "days":["Sat"],
      "name": "Pentesting Lab Training",
      "desc": "The PenTraining for cybersecurity competition.",
      "owner": new ObjectID("000000000000000000000002"),
      "loc": "LGRT 212",
      "start": new Date().getTime() + (604800000*2),//1478962800000, //Sat, Nov. 12 2016
      "length": 18000000 //5 hours long
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "days":["Thurs"],
      "name": "Game Hobbyists' League",
      "desc": "The GHL is an RSO that brings anyone and everyone at UMass to have a great time. The GHL holds weekly game nights - featuring board, card, and video games",
      "owner": new ObjectID("000000000000000000000003"),
      "loc": "Campus Center",
      "start": new Date().getTime() + 604800000, //1478736000000,
      "length": 18000000 //5 hrs
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "days":["Thurs"],
      "name": "Pentesting Club Meetings",
      "desc": "Administrative meeting for cybersecurity competition team.",
      "owner": new ObjectID("000000000000000000000002"),
      "loc": "LGRT 212",
      "start": new Date().getTime() + (604800000*3),// 1478930400000, //Thur, Nov. 10 2016
      "length": 5400000 //1.5 hours long
    }
  },
  "Users": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "name": "Billie Jean",
      "email": "bjean@umass.edu",
      "groups": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003")], //groups to which user has membership by id
      "interests": ["cats","karate"], //array of strings for now later hopefully tags for classifying groups
      "photo": "../img/identicon.png",
      "events": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003")] //subscribed events by id
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "name": "Gregory Gregorivic",
      "email": "ggregor@umass.edu",
      "groups": [new ObjectID("000000000000000000000003")] ,
      "interests": [] ,
      "photo": "<filepath>",
      "events": [new ObjectID("000000000000000000000003")]
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "name": "Optimus Prime",
      "email": "oprime@umass.edu",
      "groups": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")] ,
      "interests": ["karate", "games"] ,
      "photo": "<filepath>",
      "events": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000004")]
    }
  },
  "Groups": {
     "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "owner": new ObjectID("000000000000000000000001"), //managing user
      "name": "Umass Shotokan Karate Club",
      "email": "karate@umass.edu", //main email for group
      "desc": "The Umass Shotokan Karate Club is a long standing branch of the Internation Shotokan Karate Federation. We are the 6th club founded though the organization in the United States and have been at this university for over 40 years!",
      "photo": "../img/iskf.jpeg",
      "events": [new ObjectID("000000000000000000000001")] //events owned by id
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "owner": new ObjectID("000000000000000000000003"),
      "name": "Umass Penetration Testng Club",
      "email": "haxxors@umass.edu",
      "desc": "The Umass Penetration Testing Club is a new club, founded in the beginning of Fall 2016 with hopes of competing in CCDC in march of 2017",
      "photo": "<filepath>",
      "events": [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000004")]
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "owner": new ObjectID("000000000000000000000002"),
      "name": "Umass Game Hobbyists League",
      "email": "gaming@umass.edu",
      "desc": "The GHL is an RSO that brings anyone and everyone at UMass to have a great time. The GHL holds weekly game nights - featuring board, card, and video games",
      "photo": "../img/GHL.jpg",
      "events": [new ObjectID("000000000000000000000003")]
    }
  }
};

/**
 * Adds any desired indexes to the database.
 */
function addIndexes(db, cb) {
  db.collection('feedItems').createIndex({ "contents.contents": "text" }, null, cb);
}

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
