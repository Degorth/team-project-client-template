import React from 'react';
import {getUpcomingEvents} from './../server.js';

export default class Bored extends React.Component{

  constructor(props){
    super(props);
    this.state={
      "events":[]
    }
  }

  refresh(){
    getUpcomingEvents((eventsList) => this.setState({events: eventsList}));
  }

  componentDidMount(){
    this.refresh();
  }

  /*
  addToScheduleHandler(){
    //need to add an add to schedule function to server
  }

  rerollHandler(){
    //need to add code to handle a reroll
  }
  */

  render(){
    function getEvent(){
      //events is an array you can get a value from it in a number of ways
      /*
      var ev = this.state.events[0]; //get the first
      */
      //then replace the text below with the values from the 'ev' example 'UMass ShotoKan Karate Club' ==> ev.name
      return (
        <div>
        <div className="row">
          <div className="col-md-4">
              <img src="#" width="250px" />
          </div>
          <div className="col-md-8">
              <div className="row">
                  <h1>Umass Shotokan Karate Club</h1>
              </div>
              <div className="row">
                      <h3>The Umass Shotokan Karate Club is a long standing branch of the
          Internation Shotokan Karate Federation. We are the 6th club founded
          though the organization in the United States and have been at this
          university for over 40 years!</h3>
              </div>
          </div>
      </div>
      <hr />
      <div className="row text-center">
          <h4>Name:</h4> Weekly Shotokan Karate Training <br />
          <h4>Organizer:</h4> Umass Shotokan Karate Club <br />
          <h4>Location:</h4> Boyden Gym Basement Squash Courts <br />
          <h4>Time:</h4> 4:30 - 5:30PM <br />
          <h4>Contact Info:</h4> <a href="#">fakeemail@umass.edu</a> <br />
      </div>
    </div>
  );
    }
    return(
      <div className="row">
          <div className="cols-med-8">
              {getEvent()}
              <hr />
              <div className="row text-center">
                  <div className="col-md-6">
                    <a href="#" className="btn btn-secondary">
                        <span className="glyphicon glyphicon-edit"></span> Add to Schedule
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a href="#" className="btn btn-secondary">
                        <span className="glyphicon glyphicon-repeat"></span> Reroll For Another Event
                    </a>
                  </div>
              </div>
          </div>
      </div>
    );
  }

}
