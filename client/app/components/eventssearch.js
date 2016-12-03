import React from 'react';
import {Link} from 'react-router';
import {searchEvents} from './../server.js';

export default class EventsSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "searchinput": "",
            "days": [],
            "after": "",
            "before": "",
            "results": undefined
        }
    }

    handleChange(checkbox, day) {
        if (checkbox.target.checked) {
            var arrayvar = this.state.days.slice()
            arrayvar.push(day)
            this.setState({days: arrayvar})
        } else {
            arrayvar = this.state.days.slice()
            arrayvar = arrayvar.filter((d) => d !== day);
            this.setState({days: arrayvar})
        }
    }

    handleSearch(searchterms) {
        this.setState({searchinput: searchterms});
    }

    handleBefore(beforetime) {
        this.setState({before: beforetime});
    }

    handleAfter(aftertime) {
        this.setState({after: aftertime});
    }

    handleSubmit(e) {
        e.preventDefault();
        searchEvents(this.props.user, this.state.searchinput, this.state.days, this.state.after, this.state.before, (res) => this.setState({"results": res}));
    }

    dispResults() {
        if(this.state.results===undefined) return(<div></div>);
        if (this.state.results !== undefined && this.state.results !== null) {
            return (
                <div className="searchresult">
                    {this.state.results.map((ev) => {
                        return (
                            <div key={ev._id}>
                                <img src="#" width="150px"/> <h4>{ev.name}</h4>
                                <div>{ev.desc}</div>
                                <Link to={'event/'+ev._id} className="btn btn-secondary" role="button">
                                    <span className="glyphicon glyphicon-hand-up"></span>
                                    View Group Page</Link>
                            </div>
                        )
                    })}
                </div>
            );
        }
        else {
          return (<h5> No Events Found </h5>);
        }

    }

    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-md-1"></div > <div className="col-md-10">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Event/Organization Description" onChange={(e) => this.handleSearch(e.target.value)}/>
                    </div>
                    <div className="form-check">
                        <label htmlFor="form-check">Occurring On</label>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, "Mon")}/>
                            Mon
                        </label>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, "Tue")}/>
                            Tue
                        </label>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, "Wed")}/>
                            Wed
                        </label>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, "Thurs")}/>
                            Thurs
                        </label>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, "Fri")}/>
                            Fri
                        </label>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, "Sat")}/>
                            Sat
                        </label>
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, "Sun")}/>
                            Sun
                        </label>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-time-input" className="col-xs-2 col-form-label">Occurring After</label>
                        <div className="col-xs-10">
                            <input className="form-control" type="time" onChange={(e) => this.handleAfter(e.target.value)} value={this.state.after} id="example-time-input"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-time-input" className="col-xs-2 col-form-label">Before</label>
                        <div className="col-xs-10">
                            <input className="form-control" type="time" onChange={(e) => this.handleBefore(e.target.value)} value={this.state.before} id="example-time-input"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block" onClick={(e) => this.handleSubmit(e)}>Find Events!</button>
                </form>
            </div> < /div>
                <hr/ > <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {this.dispResults()}
                        </div>
                    </div>
                </div>
            </div> < /div>
        );
    }
}
