import React from 'react';
import {getUpcomingEvents, addEventToUser} from './../server.js';
import {Link} from 'react-router';

export default class Bored extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "events": [],
            "currEventId": -1
        }
    }

    refresh() {
        getUpcomingEvents(this.props.user,(eventsList) => this.setState({events: eventsList, currEventId: -1}));
    }

    componentDidMount() {
        this.refresh();
    }

    handleEventIdUpdate(id){
      if(this.state.currEventId===-1){
        this.setState({"currEventId":id});
      }
    }

    rerollHandler(e) {
      e.preventDefault();
      this.refresh();
    }

    addToScheduleHandler(e) {
      e.preventDefault();
      addEventToUser(this.props.user, this.state.currEventId,(res)=>this.refresh(res));
    }

    getEvent() {
        if(this.state.events.length>0){
            var min = Math.ceil(0); //Lower bound of event id's to choose from
            var max = Math.floor(this.state.events.length - 1); //Upper bound of event id's to choose from
            var randId = Math.floor(Math.random() * (max - min + 1)) + min; //Random event id in given range
          var ev = this.state.events[randId];
          this.handleEventIdUpdate(ev._id);
          var date = new Date(ev.start * 1000);
          // Hours part from the timestamp
          var hours = date.getHours();
          // Minutes part from the timestamp
          var minutes = "0" + date.getMinutes();
          // Will display time in 10:30:23 format
          var startTime = hours + ':' + minutes.substr(-2);
          date = new Date((ev.start + ev.length) * 1000);
          hours = date.getHours();
          minutes = "0" + date.getMinutes();
          var endTime = hours + ':' + minutes.substr(-2);

          return (
              <div>
                  <div className="row">
                      <div className="col-md-4">
                          <img src="#" width="250px"/>
                      </div>
                      <div className="col-md-8">
                          <div className="row">
                              <h1>{ev.name}</h1>
                          </div>
                          <div className="row">
                              <h3>{ev.desc}</h3>
                          </div>
                      </div>
                  </div>
                  <hr/>
                  <div className="row text-center">
                      <h4>Name:</h4>
                      {ev.name}
                      <br/>
                      <h4>Organizer:</h4>
                      {ev.owner.name}
                      <br/>
                      <h4>Location:</h4>
                      {ev.loc}
                      <br/>
                      <h4>Time:</h4>
                      {startTime}
                      - {endTime}
                      <br/>
                      <h4>Contact Info:</h4>
                      <a href="#">{ev.owner.email}</a>
                      <br/>
                  </div>
              </div>
          );
        }
        else{
          return(
            <div className="row text-center">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h1>
                    You are already signed up for all the upcoming events! You must be very bored to want more!
                </h1>
                <Link to='/schedule'>Click here to go to your schedule...</Link>
              </div>
            </div>
          );
        }

    }

    render() {
        return (
            <div className="row">
                <div className="col-med-8">
                    {this.getEvent()}
                    <hr/>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <button className="btn btn-secondary" onClick={(e)=>this.addToScheduleHandler(e)}>
                                <span className="glyphicon glyphicon-edit"></span>
                                Add to Schedule
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-secondary" onClick={(e)=>this.rerollHandler(e)}>
                                <span className="glyphicon glyphicon-repeat"></span>
                                Reroll For Another Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
