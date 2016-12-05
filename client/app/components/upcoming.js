Window.React = require('react');
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import {getUpcomingEvents} from './../server.js'
import {unixTimeToString} from "./../util";


export default class Upcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "eventsList": []
    }
  }
  refresh() {
      getUpcomingEvents(this.props.user,(eventsList) => this.setState({events: eventsList, currEventId: -1}));
  }

  componentDidMount() {
        this.refresh();
  }

  render(){
    let rows = this.state.eventsList
    return (
        <table>
        <thead>
          <tr>
            <td>
                Name
            </td>
            <td>
                Organizer
            </td>
            <td>
                Location
            </td>
            <td>
                Contact Info
            </td>
            <td>
                Description
            </td>
          </tr>
          </thead>
          <tbody>
          {rows.map(event =>
            <tr>
              <td>
                  {event.name}
              </td>
              <td>
                  Organizer
              </td>
              <td>
                  Location
              </td>
              <td>
                  Contact Info
              </td>
              <td>
                  Description
              </td>
            </tr>
          )}
          </tbody>
        </table>

    );
    // this.state.eventsList.forEach(function(event) {
    //     rows.push(<CustomRow Name={event.name} Organzer={event.owner.name} Location = {event.loc} Contact = {event.owner.email} />);
    //     }.bind(this)
    // );
  }
}
