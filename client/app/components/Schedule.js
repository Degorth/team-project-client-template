import React from 'react';
import EventSqDisp from './eventSqDisp.js';
import {getScheduledEvents} from './../server.js';
import {getDayOfWeek, getMonthOfYear} from './../util.js';

const oneDay = 86400000;
const oneWeek = 604800000;

var today = function(ev) {
    let eventEndTime = new Date(ev.start + ev.length);
    let now = new Date();
    return (now.getDate() == eventEndTime.getDate() && now.getMonth() == eventEndTime.getMonth() && now.getYear() == eventEndTime.getYear());
}
var thisWeek = function(ev) {
    let eventEndTime = new Date(ev.start + ev.length).getTime()
    let tomorrow = (new Date().getTime() + oneDay);
    let weekFromTomorrow = (tomorrow + oneWeek);
    return (tomorrow <= eventEndTime && eventEndTime <= weekFromTomorrow);
};
var nextWeek = function(ev) {
    let eventEndTime = new Date(ev.start + ev.length).getTime()
    let weekFromTomorrow = (new Date().getTime() + oneDay + oneWeek);
    let twoWeekFromTomorrow = (weekFromTomorrow + oneWeek);
    return (weekFromTomorrow <= eventEndTime && eventEndTime <= twoWeekFromTomorrow);
};
var future = function(ev) {
    let eventEndTime = new Date(ev.start + ev.length).getTime()
    let twoWeekFromTomorrow = (new Date().getTime() + oneDay + (2 * oneWeek));
    return (twoWeekFromTomorrow <= eventEndTime);
};
export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: undefined
        }
    }
    refresh() {
        getScheduledEvents(this.props.user, (eventsList) => this.setState({events: eventsList}));
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

    parseDateFormat(d, modifier) {
        return getDayOfWeek(d.getDay() + modifier % 7) + " " + getMonthOfYear(d.getMonth()) + " " + (d.getDate() + modifier);
    }

    render() {
        var todayList = this.filter(today);
        var thisWeekList = this.filter(thisWeek);
        var nextWeekList = this.filter(nextWeek);
        var futureList = this.filter(future);
        function eventsToDisp(list, user) {
            if (list !== null) {
                if (list.length > 0) {
                    return (
                        <div className="row">
                            {list.map(function(ev){
                                return (<EventSqDisp key={ev._id} user={user} event={ev}/>);
                            },this)}
                        </div>
                    );

                }
            } else {
                {
                    return(
                        <div className="row">
                            <div className="tile col-md-2">
                                <h4 style={{
                                    textDecoration: "underline"
                                }}>No events scheduled</h4>
                                <div className="tile-block">
                                    <h6 className="tile-subtitle text-muted">
                                        <a href="#">Sign up for some events!</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }
        var curDay = new Date();
        return (
            <div className="row-md-3">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3>
                                <span className="schedule-title">Schedule</span>
                            </h3>

                            <h4 className="schedule-header">Today: {this.parseDateFormat(curDay, 0)}</h4>
                            {eventsToDisp(todayList,this.props.user)}

                            <h4 className="schedule-header">This Week: {this.parseDateFormat(curDay, 1) + " - " + this.parseDateFormat(curDay, 8)}</h4>
                            {eventsToDisp(thisWeekList,this.props.user)}

                            <h4 className="schedule-header">Next Week: {this.parseDateFormat(curDay, 8) + " - " + this.parseDateFormat(curDay, 15)}</h4>
                            {eventsToDisp(nextWeekList,this.props.user)}

                            <h4 className="schedule-header">Future Events</h4>
                            {eventsToDisp(futureList,this.props.user)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
