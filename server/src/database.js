var initialData = {
  "Events": {
    "1": {
      "_id": 1,
      "days": ["Mon","Wed","Fri"],
      "name": "Umass Shotokan Karate Club",
      "desc": "The Umass Shotokan Karate Club is a long standing branch of the Internation Shotokan Karate Federation. We are the 6th club founded though the organization in the United States and have been at this university for over 40 years!",
      "owner": 1, // the group that owns this event
      "loc": "Boyden Gym Basement Squash Courts",
      "start": new Date().getTime() + 7200000, //1478803334000
      "length": 7200000
    },
    "2": {
      "_id": 2,
      "days":["Sat"],
      "name": "Pentesting Lab Training",
      "desc": "The PenTraining for cybersecurity competition.",
      "owner": 2,
      "loc": "LGRT 212",
      "start": new Date().getTime() + (604800000*2),//1478962800000, //Sat, Nov. 12 2016
      "length": 18000000 //5 hours long
    },
    "3": {
      "_id": 3,
      "days":["Thurs"],
      "name": "Game Hobbyists' League",
      "desc": "The GHL is an RSO that brings anyone and everyone at UMass to have a great time. The GHL holds weekly game nights - featuring board, card, and video games",
      "owner": 3,
      "loc": "Campus Center",
      "start": new Date().getTime() + 604800000, //1478736000000,
      "length": 18000000 //5 hrs
    },
    "4": {
      "_id": 4,
      "days":["Thurs"],
      "name": "Pentesting Club Meetings",
      "desc": "Administrative meeting for cybersecurity competition team.",
      "owner": 2,
      "loc": "LGRT 212",
      "start": new Date().getTime() + (604800000*3),// 1478930400000, //Thur, Nov. 10 2016
      "length": 5400000 //1.5 hours long
    }
  },
  "Users": {
    "1": {
      "_id": 1,
      "name": "Billie Jean",
      "email": "bjean@umass.edu",
      "groups": [1, 3], //groups to which user has membership by id
      "interests": ["cats","karate"], //array of strings for now later hopefully tags for classifying groups
      "photo": "../img/identicon.png",
      "events": [1, 3] //subscribed events by id
    },
    "2": {
      "_id": 2,
      "name": "Gregory Gregorivic",
      "email": "ggregor@umass.edu",
      "groups": [3] ,
      "interests": [] ,
      "photo": "<filepath>",
      "events": [3]
    },
    "3": {
      "_id": 3,
      "name": "Optimus Prime",
      "email": "oprime@umass.edu",
      "groups": [1, 2] ,
      "interests": ["karate", "games"] ,
      "photo": "<filepath>",
      "events": [1, 2, 4]
    }
  },
  "Groups": {
     "1": {
      "_id": 1,
      "owner": 1, //managing user
      "name": "Umass Shotokan Karate Club",
      "email": "karate@umass.edu", //main email for group
      "desc": "The Umass Shotokan Karate Club is a long standing branch of the Internation Shotokan Karate Federation. We are the 6th club founded though the organization in the United States and have been at this university for over 40 years!",
      "photo": "../img/iskf.jpeg",
      "events": [1] //events owned by id
    },
    "2": {
      "_id": 2,
      "owner": 3,
      "name": "Umass Penetration Testng Club",
      "email": "haxxors@umass.edu",
      "desc": "The Umass Penetration Testing Club is a new club, founded in the beginning of Fall 2016 with hopes of competing in CCDC in march of 2017",
      "photo": "<filepath>",
      "events": [2, 4]
    },
    "3": {
      "_id": 3,
      "owner": 2,
      "name": "Umass Game Hobbyists League",
      "email": "gaming@umass.edu",
      "desc": "The GHL is an RSO that brings anyone and everyone at UMass to have a great time. The GHL holds weekly game nights - featuring board, card, and video games",
      "photo": "../img/GHL.jpg",
      "events": [3]
    }
  }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
