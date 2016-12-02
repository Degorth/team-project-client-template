import React from 'react';
import {setUserGroups, getGroups} from '../server.js';

export default class ProfileGroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.user,
      groups: props.user.groups
    }
  }

  componentWillMount() {
    getGroups((groups) => this.setState({"groups": groups}));
  }

  handleSubmit(e) {
    e.preventDefault();
    setUserGroups(this.state, (userData) => {this.setState(userData)});
  }

  render() {
    return(
      <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
              <div className="panel panel-default">
                  <div className="panel-body">
                      <form>
                          <div id="groupradios">
                          </div>
                      </form>
                  </div>
                  <div className="panel-footer">
                      <div className="form-group row">
                          <div className="offset-sm-2 col-sm-10">
                              <button className="btn btn-primary" onClick={(e)=>this.handleSubmit(e)}>
                                  <span className="glyphicon glyphicon-pin"></span>
                                  Save</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
