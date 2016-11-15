import React from 'react';
import {unixTimeToString} from './../util.js';

export default class EventSqDisp extends React.Component {
    render() {
        return (
            <div className="tile col-md-2">
                <h4 style={{textDecoration: "underline"}}>
                    {unixTimeToString(this.props.event.start)+ "-" + unixTimeToString(this.props.event.start+this.props.event.length)}
                </h4>
                <h4 style={{textDecoration: "underline"}}>
                    {this.props.event.loc}
                </h4>
                <img className="tile-img-top profile-img" src="#" alt="img"/>
                <div className="tile-block">
                    <h4 className="tile-title">{this.props.event.name}</h4>
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
