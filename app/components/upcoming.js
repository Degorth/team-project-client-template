<<<<<<< HEAD
Window.React = require('react');
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import SortableTable from 'react-sortable-table';
import {getUpcomingEvents} from './../server.js'
import {unixTimeToString} from "./../util";


export default class Upcoming extends Component {
  constructor() {
    super()
    this.state = {
      data: getUpcomingEvets();
    };
  }

  refresh(){
      getUpcomingEvents(this.props.user, (eventsList) => this.setState({events: eventsList}));
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
      }
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
      }
      {
        header: 'Location',
        key: 'loc',
        headerStyle: { fontSize: '15px' },
        headerProps: { className: 'align-left' },
        descSortFunction: NameSorter.desc,
        ascSortFunction: NameSorter.asc
      }
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
      <SortableTable
        data={this.state.eventsList}
        columns={columns}
        style={style}
        iconStyle={iconStyle} />
    );
 }

return(
  <div class="col-md-offset-3 col-centered" id="table">
        <div class="container">
            <h3>Upcoming Events:</h3>
            <p> Check out new events coming soon near you </p>
            <Upcoming />, document.getElementById('upcoming')
        </div>
    </div>
)
