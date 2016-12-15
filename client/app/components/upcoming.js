Window.React = require('react');
//import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import {getUpcomingEvents} from './../server.js'
import {getMonthOfYear} from "./../util.js";
import {Link} from 'react-router';


export default class Upcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "events": []
    }
  }
  refresh() {
      getUpcomingEvents(this.props.user,(eventsList) => this.setState({events: eventsList, currEventId: -1}));
  }

  componentDidMount() {
        this.refresh();
  }

  render(){

    return (
        <div className="upcomingEvents">
            {this.state.events.map((ev) => {
              var stDate = new Date(ev.start);
                return (
                    <div className="row text-center" key={ev._id}>
                        <img src={'/event/' + ev._id + '/user/' + this.props.user + '/photo'} width="150px"/>
                        <Link to={'events/'+ev._id+'/eventInfo'}><h4>{ev.name}</h4></Link>
                        <div><b>{getMonthOfYear(stDate.getMonth()) + " " + stDate.getDate() + ", " + stDate.getFullYear()}</b>
                        </div>
                        <div>{ev.desc}</div>
                    </div>
                )
            })}
        </div>
    );
  }
}
