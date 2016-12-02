var startData = {
  "Events": {
    "1": {
      "_id": 1,
      "days": ["Mon","Wed","Fri"],
      "name": "Umass Shotokan Karate Club",
      "desc": "The Umass Shotokan Karate Club is a long standing branch of the Internation Shotokan Karate Federation. We are the 6th club founded though the organization in the United States and have been at this university for over 40 years!",
      "owner": 1, // the group that owns this event
      "loc": "Boyden Gym Basement Squash Courts",
      "start": 1478803334000,
      "length": 7200000
    },
    "2": {
      "_id": 2,
      "days":["Sat"],
      "name": "Pentesting Lab Training",
      "desc": "The PenTraining for cybersecurity competition.",
      "owner": 2,
      "loc": "LGRT 212",
      "start": 1478962800000, //Sat, Nov. 12 2016
      "length": 18000000 //5 hours long
    },
    "3": {
      "_id": 3,
      "days":["Thurs"],
      "name": "Game Hobbyists' League",
      "desc": "The GHL is an RSO that brings anyone and everyone at UMass to have a great time. The GHL holds weekly game nights - featuring board, card, and video games",
      "owner": 3,
      "loc": "Campus Center",
      "start": 1478736000000,
      "length": 18000000 //5 hrs
    },
    "4": {
      "_id": 4,
      "days":["Thurs"],
      "name": "Pentesting Club Meetings",
      "desc": "Administrative meeting for cybersecurity competition team.",
      "owner": 2,
      "loc": "LGRT 212",
      "start": 1478930400000, //Thur, Nov. 10 2016
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
}

var data = JSON.parse(localStorage.getItem('startData'));

if (data === null) {
  data = JSONClone(startData);
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

export function readCollection(collection) {
  return JSONClone(data[collection]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem('events_data', JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem('events_data', JSON.stringify(data));
  data = JSONClone(data);
}
