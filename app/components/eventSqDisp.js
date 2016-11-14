import React from 'react';

export default class eventSqDisp extends React.Component {
    render() {
        return (
            <div className="tile col-md-2">
                <h4 style="text-decoration: underline;">
                    {this.props.start}
                </h4>
                <h4 style="text-decoration: underline;">
                    {this.props.loc}
                </h4>
                <img className="tile-img-top profile-img" src={this.props.filepath} alt="Karate Club img"/>
                <div className="tile-block">
                    <h4 className="tile-title">{this.props.name}</h4>
                    <h6 className="tile-subtitle text-muted">
                        <a href="#">
                            {this.props.owner_name}
                        </a>
                    </h6>
                    <p className="tile-text">{this.props.desc}</p>
                </div>
            </div>
        );
    }
}
