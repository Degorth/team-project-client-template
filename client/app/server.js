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

export function getScheduledEvents(user_id, cb) {
    sendXHR('GET', '/user/' + user_id + '/schedule', undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getEvent(event_id, user_id, cb) {
    sendXHR('GET', '/event/' + event_id + '/user/' + user_id, undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function postNewEvent(event_id, eventToPost, cb) {
    sendXHR('POST', '/event/' + event_id, eventToPost, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function searchEvents(user_id, searchInput, days, after, before, cb) {
    sendXHR('POST', '/search?searchInput=' + searchInput + '&days=' + days + '&after=' + after + '&before=' + before, {
        "searchInput": searchInput,
        "days": days,
        "after": after,
        "before": before
    }, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getUserData(user_id, cb) {
    sendXHR('GET', '/user/' + user_id, undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function addEventToUser(user_id, event_id, cb) {
    sendXHR('PUT', '/user/' + user_id + '/event/' + event_id, undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getUpcomingEvents(user_id, cb) {
    sendXHR('GET', '/user/' + user_id + '/upcoming', undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getUserGroups(user_id, cb) {
    sendXHR('GET', '/user/' + user_id + '/groups', undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    })
}
export function getGroups(cb) {
    sendXHR('GET', '/groups', undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    })
}
/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
/* These functions are not implemented on the new server.
 *
 *
 *
 *
 *
 *
 *
 *
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
*/
