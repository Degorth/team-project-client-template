import React from 'react';
import eventSqDisp from 'eventSqDisp.js';

export default class Schedule extends React.Component {
    render() {
        var todayList = [];
        var thisWeekList = [];
        var nextWeekList = [];
        var futureList = [];
        function eventsToDisp(list) {
            switch (list.length) {
                case 0:
                    {
                        return (
                            <div className="tile col-md-2">
                                <h4 style="text-decoration: underline;">No events scheduled</h4>
                                <div className="tile-block">
                                    <h6 className="tile-subtitle text-muted">
                                        <a href="#">Sign up for some events!</a>
                                    </h6>
                                </div>
                            </div>
                        );
                    }
                default:
                    {
                        {
                            list.map((ev) => {
                                return (<eventSqDisp start={ev.start} loc={ev.loc} filepath={ev.filepath} name={ev.name} owner_name={ev.owner.name} desc={ev.desc}/>)
                            })
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
                            <div className="row">
                                {eventsToDisp(todayList)}
                            </div>

                            <h4 className="schedule-header">This Week: Thursday, October 6th - Thursday, October 13th</h4>
                            <div className="row">
                                {eventsToDisp(thisWeekList)}
                            </div>

                            <h4 className="schedule-header">Next Week: Friday, October 14th - Friday, October 21st</h4>
                            <div className="row">
                                {eventsToDisp(nextWeekList)}
                            </div>

                            <h4 className="schedule-header">Future Events</h4>
                            <div className="row">
                                {eventsToDisp(futureList)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
