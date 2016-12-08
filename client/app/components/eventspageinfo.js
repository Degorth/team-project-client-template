import React from 'react';
import {getEvent, addEventToUser, userIsAttending, removeEventFromUser} from './../server.js';

export default class eventspageinfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "event": this.props.eventId,
            "attending": false
        }
    }

    refresh() {
        getEvent(this.props.eventId, this.props.user, (event) => this.setState({event: event}));
        userIsAttending(this.props.eventId, this.props.user, (att) => this.setState({attending: att}));
    }
    componentDidMount() {
        this.refresh();
    }
    addToScheduleHandler(e) {
        e.preventDefault();
        addEventToUser(this.props.user, this.state.event._id, () => this.refresh());
    }
    removeFromScheduleHandler(e) {
        e.preventDefault();
        removeEventFromUser(this.props.user, this.state.event._id, () => this.refresh());
    }

    getAddRemoveButton() {
        if (this.state.attending) {
            return (
                <a className="btn btn-primary" onClick={(e) => this.removeFromScheduleHandler(e)} role="button">
                    <span className="glyphicon glyphicon-edit"></span>
                    Remove From Schedule</a>
            )
        } else {

            return (
                <a className="btn btn-primary" onClick={(e) => this.addToScheduleHandler(e)} role="button">
                    <span className="glyphicon glyphicon-edit"></span>
                    Add to Schedule</a>
            )
        }
    }

    render() {
        if (typeof(this.state.event) !== "string") {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={this.state.event.photo} width="250px"/>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <h1>{this.state.event.name}</h1>
                                </div>
                                <div className="row">
                                    <h3>{this.state.event.desc}</h3>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row centering">
                            <h4>Name:</h4>
                            {this.state.event.name}
                            <br/>
                            <h4>Organizer:</h4>
                            {this.state.event.owner.name}
                            <br/>
                            <h4>Location:</h4>
                            {this.state.event.loc}
                            <br/>
                            <h4>Contact Info:</h4>
                            <a href="#">{this.state.event.owner.email}</a>
                            <br/>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-md-4">
                                <h4>See More From This Group...</h4>
                            </div>
                            <div className="col-md-4">
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#genericModal">
                                    <span className="glyphicon glyphicon-calendar"></span>
                                    View Events</button>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#genericModal">
                                    <span className="glyphicon glyphicon-user"></span>
                                    View Members</button>
                            </div>
                            <div className="col-md-4">
                                {this.getAddRemoveButton()}
                                <a className="btn btn-primary" href="#" role="button">
                                    <span className="glyphicon glyphicon-pencil"></span>
                                    Write a Review</a>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="genericModal" tabIndex="-1" role="dialog" aria-labelledby="genericModalLabel">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="modal-title">View Events/Members</h4>
                                </div>
                                <div className="modal-body">
                                    <p>Something . . .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }

}
