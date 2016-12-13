import React from 'react';
import {Link} from 'react-router';
import {parseTime} from './../util.js';

//ADD IMAGE PATH
export default class EventSqDisp extends React.Component {
    render() {
        return (
            <div className="tile col-md-2">
                <h2>
                    {this.props.event.loc}
                </h2>
                <h4>
                    {parseTime(this.props.event.start, this.props.event.start + this.props.event.length)}
                </h4>
                <img className="tile-img-top profile-img" src={'/event/' + this.props.event._id + '/user/' + this.props.user + '/photo'} alt="img"/>
                <div className="tile-block">
                    <Link to={'events/' + this.props.event._id + '/eventInfo'}>
                        <h4 className="tile-title">{this.props.event.name}</h4>
                    </Link>
                    <h6 className="tile-subtitle text-muted">
                        <a href="#">
                            {this.props.event.owner.name}
                        </a>
                    </h6>
                    <p className="tile-text">{this.props.event.desc}</p>
                </div>
            </div>
        );
    }
}
