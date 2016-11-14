import {readDocument, writeDocument, addDocument} from './database.js';
/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
    setTimeout(() => {
        cb(data);
    }, 4);
}

export function postNewGroup(id, owner_id, name, email, description, filepath, event_ids, cb) {
    var newGroup = {
        "_id": id,
        "owner": owner_id, //managing user
        "name": name,
        "email": email, //main email for group
        "desc": description,
        "photo": filepath,
        "events": event_ids
    };
    // Write the new group to the document
    newGroup = addDocument('Groups', newGroup);
    // Fetch the associated user
    var userData = readDocument('Users', owner_id);
    // add the new group to the user Data
    userData.groups.unshift(newGroup._id);
    emulateServerReturn(newGroup, cb);
}

export function postNewEvent(eventToPost, cb) {
    //This Function takes an event JSON and writes it to the server. See Eventscreat.js
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
    emulateServerReturn(blankEvent, cb);
}
/*
  export function postNewEvent(name,desc,owner_id,loc,start,length,offset,cb) {
    var newEvent = {
      "name" : name,
      "desc": desc,
      "owner":owner_id,
      "loc" : loc,
      "start" : start,
      "length": length,
      "offset":offset
    };
    // Write the new event to the document
    newEvent = addDocument('Events', newEvent);
    // Fetch the associated group
    var groupData = readDocument('Groups', owner_id);
    // add the new event to the group Data
    groupData.events.unshift(newEvent._id);
    // Write back to the document the new group data
    writeDocument('Groups',groupData);
    emulateServerReturn(newEvent, cb);
  }
  */

export function getScheduledEvents(user_id, cb) {
    var userData = readDocument('Users', user_id);
    var events = userData.events.map((event_id) => readDocument('Events', event_id));
    //events = events.forEach((event) => event.owner = readDocument('Groups',event.owner));
    emulateServerReturn(events, cb);
}

export function getUpcomingEvents(cb) {
    var number = 3;
    var i = 1;
    var result = {};
    var eventData;
    while (i < number) {
        eventData = readDocument('Events', i);
        result.push(eventData);
        i = i + 1;
    }
    emulateServerReturn(result, cb);
}

export function searchEvents(searchInput, days, after, before, cb) {
    emulateServerReturn(null, cb)
    /*
    var number = 3;
    var i = 1;
    var result = {};
    var eventData;
    var searchString = searchInput.trim().toLowerCase();
    var beforeString = before.trime().toLowerCase();
    var afterString = after.trime().toLowerCase();
    var daysString = days.toString();
    while (i < number) {
      eventData = readDocument('Events', i);
      if (searchString.match(eventData.name)) {
        result.push(eventData);
      }
      i = i+1;
    }
    emulateServerReturn(result,cb)
    */
}

export function getUserData(user_id, cb) {
    var data = {}
    var user = readDocument('Users', user_id)
    result.push(user);
    emulateServerReturn(data, cb);
}
