Window.React = require('react');
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import SortableTable from 'react-sortable-table';
import {getUpcomingEvents} from './../server.js'
import {unixTimeToString} from "./../util";


export default class Upcoming extends Component {
  constructor(props) {
        super(props);
        this.state = {
            events: undefined
        };
        this.state = {
            data: [
                    {
                    _id: 1,
                    days: "Mon, Wed, Fri",
                    name: "Umass Shotokan Karate Club",
                    desc: "The Umass Shotokan Karate Club is a long standing branch of the Internation Shotokan Karate Federation. We are the 6th club founded though the organization in the United States and have been at this university for over 40 years!",
                    owner: 1,
                    loc: "Boyden Gym Basement Squash Courts"
                  },
                  {
                    _id: 2,
                    days:"Sat",
                    name: "Pentesting Lab Training",
                    desc: "The PenTraining for cybersecurity competition.",
                    owner: 2,
                    loc: "LGRT 212"

                  },
                  {
                    _id: 3,
                    days: "Thurs",
                    name: "Game Hobbyists' League",
                    desc: "The GHL is an RSO that brings anyone and everyone at UMass to have a great time. The GHL holds weekly game nights - featuring board, card, and video games",
                    owner: 3,
                    loc: "Campus Center"
                  },
                  {
                    _id: 4,
                    days: "Thurs",
                    name: "Pentesting Club Meetings",
                    desc: "Administrative meeting for cybersecurity competition team.",
                    owner: 2,
                    loc: "LGRT 212"

                  }
                ]
              };

    }

  refresh(){
      getUpcomingEvents(this.props.events, (eventsList) => this.setState({events: eventsList}));
  }

  componentDidMount() {
        this.refresh();
  }

  filter(fn) {
      if (fn === null)
          return null;
      let list = this.state.events;
      if (list !== undefined && list != null) {
          list = list.filter((ev) => fn(ev));
      } else {
          return null;
      }
      if (list.length > 0)
          return list;
      else
          return null;
      }


  render() {
    const columns = [
      {
        header: 'ID',
        key: '_id',
        defaultSorting: 'ASC',
        headerStyle: { fontSize: '15px', backgroundColor: '#FFDAB9', width: '100px' },
        dataStyle: { fontSize: '15px', backgroundColor: '#FFDAB9'},
        dataProps: { className: 'align-right' },
      },
      {
        header: 'Days',
        key: 'days',
        headerStyle: { fontSize: '15px' },
        headerProps: { className: 'align-left' },
        descSortFunction: NameSorter.desc,
        ascSortFunction: NameSorter.asc
      },
      {
        header: 'Name',
        key: 'name',
        headerStyle: { fontSize: '15px' },
        headerProps: { className: 'align-left' },
        descSortFunction: NameSorter.desc,
        ascSortFunction: NameSorter.asc
      },
      {
        header: 'Description',
        key: 'desc',
        headerStyle: { fontSize: '15px' },
        sortable: false
      },
      {
        header: 'Location',
        key: 'loc',
        headerStyle: { fontSize: '15px' },
        headerProps: { className: 'align-left' },
        descSortFunction: NameSorter.desc,
        ascSortFunction: NameSorter.asc
      },
    ];

    const style = {
      backgroundColor: '#eee'
    };

    const iconStyle = {
      color: '#aaa',
      paddingLeft: '5px',
      paddingRight: '5px'
    };

    return (
       <div class="col-md-offset-3 col-centered" id="table">
        <div class="container">
            <h3>Upcoming Events:</h3>
            <p> Check out new events coming soon near you </p>
            <SortableTable data={this.state.eventsList} columns={columns} style={style}/>
        </div>
    </div>
      )
 }
}
