import React from 'react';
import {Link} from 'react-router';

export default class eventspageinfo extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "_id": props.id,
        "name": props.name,
        "desc": props.desc,
        "owner": props.owner, // the group that owns this event
        "loc": props.loc,
        "start": props.start,
        "length": props.length,
        "offset": props.offset //Weekly recurrence
      }
  }

  render() {
    return(
      <div>
        <div className="container">
          <div className="row">
              <div className="col-md-4">
                  <img src="this.state.photo" width="250px" />
              </div>
              <div className="col-md-8">
                  <div className="row">
                      <h1>this.state.name</h1>
                  </div>
                  <div className="row">
                      <p>
                          <h3>this.state.desc</h3></p>
                  </div>
              </div>
          </div>
          <hr />
          <div className="row centering">
              <h4>Name:</h4> this.state.name <br />
              <h4>Organizer:</h4> this.state.owner <br />
              <h4>Location:</h4> this.state.loc <br />
              <h4>Contact Info:</h4> <a href="#">fakeemail@umass.edu</a> <br />
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4">
              <h4>See More From This Group...</h4>
            </div>
            <div className="col-md-4">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#genericModal">
                <span className="glyphicon glyphicon-calendar"></span> View Events</button>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#genericModal">
                  <span className="glyphicon glyphicon-user"></span> View Members</button>
            </div>
            <div className="col-md-4">
                <a className="btn btn-primary" href="#" role="button">
                  <span className="glyphicon glyphicon-edit"></span> Add to Schedule</a>
                <a className="btn btn-primary" href="#" role="button">
                  <span className="glyphicon glyphicon-pencil"></span> Write a Review</a>
            </div>
          </div>
        </div>

        <div className="modal fade" id="genericModal" tabIndex="-1" role="dialog" aria-labelledby="genericModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">View Events/Members</h4>
              </div>
              <div className="modal-body">
                <p>Something . . .</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
