import React from 'react';
import {Link} from 'react-router';
import {searchEvents} from './../server.js';

export default class EventsSearch extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          "searchinput": undefined,
          "days": [],
          "after": undefined,
          "before": undefined
      }
  }

  handleChange(checkbox, day){
    if (checkbox.checked)
    {
      var arrayvar = this.state.days.slice()
      arrayvar.push(day)
      this.setState({ days: arrayvar })
    }
  }

  handleSearch(searchterms){
    this.setState({searchinput:searchterms});
  }

  handleBefore(beforetime){
    this.setState({before:beforetime});
  }

  handleAfter(aftertime){
    this.setState({after:aftertime});
  }

  handleSubmit(){
    searchEvents(this.state.searchinput,this.state.days,this.state.after,this.state.before);
  }

  render(){
    return(
      <div>

      <div className="row">
    <div className="col-md-1"></div>
    <div className="col-md-10">
      <form>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Event/Organization Description" onBlur="handleSearch(this.value)" />
        </div>
        <div className="form-check">
          <label htmlFor="form-check">Occurring On</label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" onClick="handleChange(this, Mon)" />
            Mon
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" onClick="handleChange(this, Tue)" />
            Tue
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" onClick="handleChange(this, Wed)" />
            Wed
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" onClick="handleChange(this, Thurs)" />
            Thurs
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" onClick="handleChange(this, Fri)" />
            Fri
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" onClick="handleChange(this, Sat)" />
            Sat
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" onClick="handleChange(this, Sun)" />
            Sun
          </label>
        </div>
        <div className="form-group row">
          <label htmlFor="example-time-input" className="col-xs-2 col-form-label" onBlur="handleAfter(this.value)">Occurring After</label>
          <div className="col-xs-10">
            <input className="form-control" type="time" value="13:45:00" id="example-time-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-time-input" className="col-xs-2 col-form-label" onBlur="handleBefore(this.value)">Before</label>
          <div className="col-xs-10">
            <input className="form-control" type="time" value="13:45:00" id="example-time-input" />
          </div>
        </div>
        <button type="submit" className="btn btn-secondary btn-block">Find Events!</button>
      </form>
    </div>
  </div>
  <hr />
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <div className="panel panel-default">
            <div className="panel-body">
              <div className="searchresult">
                /*<img src="img/iskf.jpg" width="150px"/> Umass' branch of International Shotokan Karate Federation.
                <div>Umass Shotokan Karate</div>
                <a className="btn btn-secondary" href="eventspageinfo.html" role="button">
                <span className="glyphicon glyphicon-hand-up"></span> View Group Page</a>*/
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
