import React from 'react';
import {Link} from 'react-router';
import {postNewEvent} from './../server';

export default class EventsCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                eventName: "",
                organizer: "1",
                loc: "",
                onetime: "",
                datetime: "",
                reoccuring: "",
                weekday: "",
                time: "",
                desc: "",
                contactInfo: ""
            }
        };
    }

    handleChange(e, updateField) {
        e.preventDefault()
        var update = this.state.data;
        if(updateField === "weekday"){
          update[updateField] = update[updateField].concat(e.target.value);
        } else {
          update[updateField] = e.target.value;
        }
        this.setState({data: update});
    }

    handleSubmit(e){
      e.preventDefault();
      postNewEvent(this.state.data, (ret)=>this.setState(ret));
    }

    render() {

        return (
            <div className="row">

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="eventName">Event Name</label>
                                    <input type="event_name" className="form-control" id="event_name" placeholder="Enter A Name for This Event" value={this.state.data.eventName} onChange={(e)=>this.handleChange(e,"eventName")}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventOrganizer">Organizer</label>
                                    <select className="form-control" id="OrganizerSelect" onChange={(e)=>this.handleChange(e,"organizer")}>
                                        <option value="1">My Group 1</option>
                                        <option value="2">My Group 2</option>
                                        <option value="3">My Group 3</option>
                                        <option value="4">My Group 4</option>
                                        <option value="5">My Group 5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventLocation">Location</label>
                                    <input type="event_loc" className="form-control" id="event_loc" placeholder="Enter A Location For This Event" value={this.state.data.loc} onChange={(e)=>this.handleChange(e,"loc")}/>
                                </div>
                                <div className="radio">
                                    <label><input type="radio" name="optradio" onChange={(e)=>this.handleChange(e,"onetime")} />One-Time Event</label>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="event-datetime-local-input" className="col-xs-2 col-form-label">Date and time</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="datetime-local" value={this.state.datetime} onChange={(e)=>this.handleChange(e,"datetime")} id="event-datetime-local-input"/>
                                    </div>
                                </div>
                                <div className="radio">
                                    <label><input type="radio" name="optradio" onChange={(e)=>this.handleChange(e,"reoccuring")}/>Weekly Event</label>
                                    <option value = "no" checked = "checked"> No </option>
                                    <option value = "yes"> Yes </option>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group row">
                                        <label htmlFor="example-month-input" className="col-xs-2 col-form-label">Week Day</label>
                                        <div className="col-xs-10">
                                            <select className="form-control" id="OrganizerSelect" onChange={(e)=>this.handleChange(e,"weekday")}>
                                                <option>Mon</option>
                                                <option>Tue</option>
                                                <option>Wed</option>
                                                <option>Thurs</option>
                                                <option>Fri</option>
                                                <option>Sat</option>
                                                <option>Sun</option>
                                            </select>
                                        </div>
                                        <label htmlFor="example-time-input" className="col-xs-2 col-form-label" value={this.state.data.time} onChange={(e)=>this.handleChange(e,"time")}>Time</label>
                                        <div className="col-xs-10">
                                            <input className="form-control" type="time" value={this.state.time} id="example-time-input"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDesc">Description of This Event</label>
                                    <textarea className="form-control" id="event_desc" rows="3" value={this.state.data.desc} onChange={(e)=>this.handleChange(e,"desc")}></textarea>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="event-email-input" className="col-xs-2 col-form-label">Contact Info</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="email" value={this.state.contactInfo} id="event-email-input" onChange={(e)=>this.handleChange(e,"contactInfo")}/>
                                    </div>
                                </div>

                                <hr/>
                                <h4>
                                    Add Some Photos . . .
                                </h4>
                                <input type="file" accept='image/*'/>

                                <ul id="imageList" className="image-list"></ul>

                            </form>
                        </div>
                        <div className="panel-footer">
                            <div className="form-group row">
                                <div className="offset-sm-2 col-sm-10">
                                    <button className="btn btn-primary" onClick={(e)=>this.handleSubmit(e)}>
                                        <span className="glyphicon glyphicon-hand-up"></span>
                                        Submit Event</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}
