import React from 'react';
import {browserHistory} from 'react-router';
import {makeGroup, addGroupToUser} from '../server.js';

export default class GroupCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: props.user,
      name: "",
      email: "",
      desc: ""
    }
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleDescChange(e) {
    this.setState({desc: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    makeGroup(this.state.owner, this.state, (groupData) => {this.setState(groupData)});
    browserHistory.push('/profileuser');
  }

  render() {
    return(
      <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
              <div className="panel panel-default">
                  <div className="panel-body">
                      <form>
                          <div className="form-group">
                              <label>Group Name</label>
                              <input type="text"
                                className="form-control"
                                id="name"
                                placeholder={this.state.name}
                                onChange={(e) => this.handleNameChange(e)}/>
                          </div>
                          <div className="form-group">
                              <label>Contact Email</label>
                              <input type="text"
                                className="form-control"
                                id="email"
                                placeholder={this.state.email}
                                onChange={(e) => this.handleEmailChange(e)}/>
                          </div>
                          <div className="form-group">
                            <label>Description</label>
                            <input type="text"
                              className="form-control"
                              id="desc"
                              placeholder={this.state.desc}
                              onChange={(e) => this.handleDescChange(e)}/>
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
