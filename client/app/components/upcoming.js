Window.React = require('react');
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import {getUpcomingEvents} from './../server.js'
import {unixTimeToString} from "./../util";


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
    let events = this.state.events
    console.log(events.length);
    return (
        <div className="upcomingEvents">
            {this.state.events.map((ev) => {
                return (
                    <div key={ev._id}>
                        <img src="#" width="150px"/> <h4>{ev.name}</h4>
                        <div>{ev.desc}</div>

                    </div>
                )
            })}
        </div>
    );
  }
}
