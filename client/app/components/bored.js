import React from 'react';
import {getUpcomingEvents, addEventToUser} from './../server.js';
import {Link} from 'react-router';
import {getMonthOfYear} from './../util.js';

export default class Bored extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "events": [],
            "eventObj": undefined,
            "randId": 0
        }
    }

    refresh() {
        if (this.state.events.length === 0) {
            getUpcomingEvents(this.props.user, (eventsList) => this.setState({"events": eventsList, "eventObj": eventsList[this.state.randId]}));
        } else {
            var newEventsList = [];
            if (this.state.events.length !== 1) {
                newEventsList = this.state.events.splice(this.state.randId, 1);
            }
            var min = Math.ceil(0); //Lower bound of event id's to choose from
            var max = Math.floor(newEventsList.length - 1); //Upper bound of event id's to choose from
            this.setState({"randId":Math.floor(Math.random() * (max - min + 1)) + min}); //Random event id in given range
            this.handleEventUpdate(this.state.randId);
            this.setState({"events": newEventsList});
        }
    }

    componentDidMount() {
        this.refresh();
    }

    handleEventUpdate(randId) {
        var ev = this.state.events[randId];
        this.setState({"eventObj": ev});
    }

    rerollHandler(e) {
        e.preventDefault();
        this.refresh();
    }

    addToScheduleHandler(e) {
        e.preventDefault();
        addEventToUser(this.props.user, this.state.eventObj._id, () => this.refresh());
    }

    getEvent() {
        if (this.state.eventObj !== undefined) {
            var ev = this.state.eventObj;
            var stDate = new Date(ev.start);
            // Hours part from the timestamp
            var hours = stDate.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + stDate.getMinutes();
            // Will display time in 10:30:23 format
            var startTime = hours + ':' + minutes.substr(-2);
            var endDate = new Date((ev.start + ev.length));
            hours = endDate.getHours();
            minutes = "0" + endDate.getMinutes();
            var endTime = hours + ':' + minutes.substr(-2);

            return (
                <div>
                    <div>
                        <div className="row">
                            <div className="col-md-4">
                                <img src="#" width="250px"/>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <Link to={'events/' + ev._id + '/eventInfo'}>
                                        <h1>{ev.name}</h1>
                                    </Link>
                                </div>
                                <div className="row">
                                    <h3>{ev.desc}</h3>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row text-center">
                            <h4>Name:</h4>
                            <Link to={'events/' + ev._id + '/eventInfo'}>{ev.name}</Link>
                            <br/>
                            <h4>Organizer:</h4>
                            {ev.owner.name}
                            <br/>
                            <h4>Location:</h4>
                            {ev.loc}
                            <br/>
                            <h4>Date:</h4>
                            {getMonthOfYear(stDate.getMonth()) + " " + stDate.getDate() + ", " + stDate.getFullYear()}
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
                    <hr/>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <button className="btn btn-secondary" onClick={(e) => this.addToScheduleHandler(e)}>
                                <span className="glyphicon glyphicon-edit"></span>
                                Add to Schedule
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-secondary" onClick={(e) => this.rerollHandler(e)}>
                                <span className="glyphicon glyphicon-repeat"></span>
                                Reroll For Another Event
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
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
                </div>
            </div>
        );
    }

}
