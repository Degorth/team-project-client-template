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
    var rows = [];
    this.state.events.forEach(function(event) {
        rows.push(<CustomRow Name={event.name} Organzer={event.owner.name} Location = {event.loc} Contact = {event.owner.email} />);
    }.bind(this)
    );


  var CustomRow = React.createClass({
      render: function() {
          return (
              <tr>
                  <td>{this.props.Name}</td>
                  <td>{this.props.Organizer}</td>
                  <td>{this.props.Location}</td>
                  <td>{this.props.Contact}</td>
              </tr>
          );
      }
  });

  }
}
