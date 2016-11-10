import React from 'react';
import {Link} from 'react-router';

export default class eventssearch extends React.Component {
  render(){
    return(
      <div>
        
      <div className="row">
    <div className="col-md-1"></div>
    <div className="col-md-10">
      <form>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Event/Organization Description" />
        </div>
        <div className="form-check">
          <label htmlFor="form-check">Occurring On</label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Mon
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Tue
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Wed
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Thurs
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Fri
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Sat
          </label>
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            Sun
          </label>
        </div>
        <div className="form-group row">
          <label htmlFor="example-time-input" className="col-xs-2 col-form-label">Occurring After</label>
          <div className="col-xs-10">
            <input className="form-control" type="time" value="13:45:00" id="example-time-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-time-input" className="col-xs-2 col-form-label">Before</label>
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
                <img src="img/iskf.jpg" width="150px"/> Umass' branch of International Shotokan Karate Federation.
                <div>Umass Shotokan Karate</div>
                <a className="btn btn-secondary" href="eventspageinfo.html" role="button">
                <span className="glyphicon glyphicon-hand-up"></span> View Group Page</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
