import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);

  export function postNewGroup(id,owner_id,name,email,description,filepath,event_ids[],cb) {
    var newGroup = {
      "_id": id,
      "owner": owner_id, //managing user
      "name": name,
      "email": email, //main email for group
      "desc": description,
      "photo": filepath,
      "events": event_ids[]
    };
    newGroup = addDocument('Groups', newGroup);
    var userData = readDocument('Users', owner_id);
    userData.groups.unshift(newGroup._id);
    emulateServerReturn(newGroup, cb);
  }

  export function postNewEvent(id,name,desc,owner,loc,start,length,offset,cb) {
    var newEvent = {
      "_id": id,
      "name": owner_id, //managing user
      "desc": name,
      "owner": email, //main email for group
      "loc": description,
      "start": filepath,
      "length": length
      "offset": offset
    };
    // Write the new event to the document
    newEvent = addDocument('Event', newEvent);
    // Fetch the associated group
    var groupData = readDocument('Groups', owner_id);
    // add the new event to the group Data
    groupData.events.unshift(newEvent._id);
    // Write back to the document the new group data
    writeDocument('Groups',groupData)
    emulateServerReturn(newEvent, cb);
  }

  export function getUpcomingEvents(input) {

  }

  export function searchEvents(input) {
    
  }


}
