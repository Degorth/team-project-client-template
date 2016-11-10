import React from 'react';
import {Link} from 'react-router';

export default class eventscreate extends React.Component {

render (){

return (
  <div className="row">
    <div className="col-md-1">
    </div>
    <div className="col-md-10">
      <div className="panel panel-default">
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input type="event_name" className="form-control" id="event_name" placeholder="Enter A Name for This Event" />
              </div>
              <div className="form-group">
                <label htmlFor="eventOrganizer">Organizer</label>
                <select className="form-control" id="OrganizerSelect">
                  <option>My Group 1</option>
                  <option>My Group 2</option>
                  <option>My Group 3</option>
                  <option>My Group 4</option>
                  <option>My Group 5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="eventLocation">Location</label>
                <input type="event_loc" className="form-control" id="event_loc" placeholder="Enter A Location For This Event" />
              </div>
              <div className="radio">
                <label><input type="radio" name="optradio" />One-Time Event</label>
              </div>
              <div className="form-group row">
                <label htmlFor="event-datetime-local-input" className="col-xs-2 col-form-label">Date and time</label>
                <div className="col-xs-10">
                  <input className="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="event-datetime-local-input" />
                </div>
              </div>
              <div className="radio">
                <label><input type="radio" name="optradio" />Weekly Event</label>
              </div>
                <form className="form-inline">
                  <div className="form-group row">
                    <label htmlFor="example-month-input" className="col-xs-2 col-form-label">Week Day</label>
                    <div className="col-xs-10">
                      <select className="form-control" id="OrganizerSelect">
                        <option>Mon</option>
                        <option>Tue</option>
                        <option>Wed</option>
                        <option>Thurs</option>
                        <option>Fri</option>
                        <option>Sat</option>
                        <option>Sun</option>
                      </select>
                    </div>
                      <label htmlFor="example-time-input" className="col-xs-2 col-form-label">Time</label>
                      <div className="col-xs-10">
                        <input className="form-control" type="time" value="13:45:00" id="example-time-input" />
                      </div>
                    </div>
                  </form>
              <div className="form-group">
                <label htmlFor="eventDesc">Description of This Event</label>
                <textarea className="form-control" id="event_desc" rows="3">
                </textarea>
              </div>
              <div className="form-group row">
                <label htmlFor="event-email-input" className="col-xs-2 col-form-label">Contact Info</label>
                <div className="col-xs-10">
                  <input className="form-control" type="email" value="example@umass.com" id="event-email-input" />
                </div>
              </div>

              <hr />
              <h4> Add Some Photos . . . </h4>
              <input type="file" accept='image/*' onChange="readURL(this);"/>

              <ul id="imageList" className="image-list">
              </ul>

            </form>
          </div>
          <div className="panel-footer">
              <div className="form-group row">
                <div className="offset-sm-2 col-sm-10">
                  <button className="btn btn-primary">
                  <span className="glyphicon glyphicon-hand-up"></span> Submit Event</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
);

}

}
