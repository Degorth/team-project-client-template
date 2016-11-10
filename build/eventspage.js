import React from 'react';
import {Link} from 'react-router';

export default class eventspage extends React.Component {

  render(){
    return(
      <div>

        <ul className="nav nav-pills">
          <li><a href="#">Search Events</a></li>
          <li><a href="#">Create Event</a></li>
        </ul>
        <hr />
        <iframe src="eventspageinfo.html" height="800" width="1000"></iframe>
        
      </div>
    );
  }

}
