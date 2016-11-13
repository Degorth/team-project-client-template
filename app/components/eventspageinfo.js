import React from 'react';
import {Link} from 'react-router';

export default class eventspageinfo extends React.Component {

  render() {
    return(
      <div>
        
        <div className="container">
          <div className="row">
              <div className="col-md-4">
                  <img src="img/iskf.jpg" width="250px" />
              </div>
              <div className="col-md-8">
                  <div className="row">
                      <h1>Umass Shotokan Karate Club</h1>
                  </div>
                  <div className="row">
                      <p>
                          <h3>The Umass Shotokan Karate Club is a long standing branch of the
            Internation Shotokan Karate Federation. We are the 6th club founded
            though the organization in the United States and have been at this
            university for over 40 years!</h3></p>
                  </div>
              </div>
          </div>
          <hr />
          <div className="row centering">
              <h4>Name:</h4> Weekly Shotokan Karate Training <br />
              <h4>Organizer:</h4> Umass Shotokan Karate Club <br />
              <h4>Location:</h4> Boyden Gym Basement Squash Courts <br />
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
