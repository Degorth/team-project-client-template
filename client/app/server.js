import {readDocument, writeDocument, addDocument, readCollection} from './database.js';

var token = 'eyJpZCI6MX0=';

function sendXHR(verb, resource, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, resource);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    /* global UGoError */
    xhr.addEventListener('load', function() {
        var statusCode = xhr.status;
        var statusText = xhr.statusText;
        if (statusCode >= 200 && statusCode < 300) {
            // Success: Status code is in the [200, 300) range.
            // Call the callback with the final XHR object.
            cb(xhr);
        } else {
            // Client or server error.
            // The server may have included some response text with details concerning
            // the error.
            var responseText = xhr.responseText;
            UGoError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
        }
    });
    // Time out the request if it takes longer than 10,000
    // milliseconds (10 seconds)
    xhr.timeout = 10000;
    // Network failure: Could not connect to server.
    xhr.addEventListener('error', function() {
        UGoError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
    });
    // Network failure: request took too long to complete.
    xhr.addEventListener('timeout', function() {
        UGoError('Could not ' + verb + " " + resource + ": Request timed out.");
    });
    switch (typeof(body)) {
        case 'undefined':
            // No body to send.
            xhr.send();
            break;
        case 'string':
            // Tell the server we are sending text.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            xhr.send(body);
            break;
        case 'object':
            // Tell the server we are sending JSON.
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            // Convert body into a JSON string.
            xhr.send(JSON.stringify(body));
            break;
        default:
            throw new Error('Unknown body type: ' + typeof(body));
    }
}

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
    setTimeout(() => {
        cb(data);
    }, 4);
}

export function addEventToUser(user_id,event_id,cb){
  var userData = readDocument('Users',user_id);
  if(userData.events.indexOf(event_id)<=0) userData.events.push(event_id);
  writeDocument('Users',userData);
  emulateServerReturn(userData,cb);
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
    addDocument('Events', eventToPost);
    // Fetch the associated group
    var groupData = readDocument('Groups', eventToPost.organizer);
    // add the new event to the group Data
    groupData.events.unshift(eventToPost._id);
    // Write back to the document the new group data
    writeDocument('Groups',groupData);
    emulateServerReturn(blankEvent, cb);
}

export function getScheduledEvents(user_id, cb) {
  sendXHR('GET', '/user/1/schedule', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUpcomingEvents(user_id,cb) {
    var number = 5;
    var i = 1;
    var result = [];
    var eventData;
    while (i < number) {
        eventData = readDocument('Events', i);
        result.push(eventData);
        i = i + 1;
    }
    var userData = readDocument('Users', user_id);
    result = result.filter((ev)=>(userData.events.indexOf(ev._id)<0));
    emulateServerReturn(result, cb);
}

export function searchEvents(user_id,searchInput, days, after, before, cb) {
  var unfiltered_results = [];
  var searchField = searchInput.toLowerCase();
  var userData = readDocument('Users', user_id);
  var user_events = userData.events.map((event_id) => readDocument('Events', event_id));
  var all_events = readCollection('Events');
  var length = Object.keys(all_events).length;
  for (var i=1 ; i < length; i++)
  {
  if (all_events[i].name.toLowerCase().includes(searchField) ||
    all_events[i].days.includes(days) ||
    all_events[i].after >= after ||
    (all_events[i].after + all_events[i].length) < before
      )
    {
      unfiltered_results.push(all_events[i]);
    }

  }
  //var filtered_result = all_events.map((event_id) => !user_events.includes(event_id))
  emulateServerReturn(unfiltered_results, cb);
}

export function getUserData(user_id, cb) {
    var user = readDocument('Users', user_id);
    emulateServerReturn(user, cb);
}

export function getUserGroups(user_id, cb) {
  var userData = readDocument('Users', user_id);
  var groups = userData.groups.map((group_id) => readDocument('Groups', group_id));
  emulateServerReturn(groups, cb);
}

export function setUserData(newData, cb) {
  var user = readDocument('Users', newData._id);
  user.name = newData.user_name;
  user.email = newData.user_email;
  user.interests = newData.user_interests;
  writeDocument('Users', user);
  emulateServerReturn(user, cb);
}

export function setUserGroups(newData, cb) {
  var user = readDocument('Users', newData._id);
  user.groups = newData.groups;
  writeDocument('Users', user);
  emulateServerReturn(user, cb);
}

export function getGroups(cb) {
  var groups = readCollection("Groups");
  var res = [];
  for (var i = 0; i < groups.length; i++) {
    res[i] = groups[i]._id
  }
  emulateServerReturn(res, cb);
}

/*export function getUserEvents(user_id, cb) {

}
*/
