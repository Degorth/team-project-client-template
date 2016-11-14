import React from 'react';
import EventSqDisp from './eventSqDisp.js';
import {getScheduledEvents} from './../server.js';

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: undefined
        }
    }
    refresh(){
      getScheduledEvents(this.props.user, (eventsList) => this.setState({events: eventsList}));
    }
    componentDidMount() {
      this.refresh();
    }

    render() {
        var todayList = this.state.events;
        var thisWeekList = [];
        var nextWeekList = [];
        var futureList = [];
        function eventsToDisp(list) {
          if(list !== undefined){
            switch (list.length) {
                case 0:
                    {
                        return (
                            <div className="row">
                                <div className="tile col-md-2">
                                    <h4 style={{textDecoration: "underline"}}>No events scheduled</h4>
                                    <div className="tile-block">
                                        <h6 className="tile-subtitle text-muted">
                                            <a href="#">Sign up for some events!</a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                default:
                    {
                        return (
                            <div className="row">
                                {list.map((ev) => {
                                    return (<EventSqDisp key={ev._id} event={ev}/>)
                                })}
                            </div>
                        );

                    }
            }
          }
        }
        return (
            <div className="row-md-3">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3>
                                <span className="schedule-title">Schedule</span>
                            </h3>

                            <h4 className="schedule-header">Today: Thursday, October 6th</h4>
                            {eventsToDisp(todayList)}

                            <h4 className="schedule-header">This Week: Thursday, October 6th - Thursday, October 13th</h4>
                            {eventsToDisp(thisWeekList)}

                            <h4 className="schedule-header">Next Week: Friday, October 14th - Friday, October 21st</h4>
                            {eventsToDisp(nextWeekList)}

                            <h4 className="schedule-header">Future Events</h4>
                            {eventsToDisp(futureList)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
