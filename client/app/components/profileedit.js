import React from 'react';
import {browserHistory} from 'react-router';
import {getUserData, setUserData} from '../server.js';

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.user,
      name: props.user.name,
      email: props.user.email,
      interests: props.user.interests
    }
  }

  componentWillMount() {
    getUserData(this.props.user, (user) => this.setState({
      name: user.name, email: user.email, interests: user.interests
    }));
  }

  handleNameChange(e) {
      e.preventDefault();
      this.setState({"name": e.target.value});
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({"email": e.target.value});
  }

  handleInterestsChange(e) {
    e.preventDefault();
    var interestsArray = e.target.value.split(",");
    this.setState({"interests": interestsArray});
  }

  handleSubmit(e) {
    e.preventDefault();
    setUserData(this.state.userid, this.state, (userData) => {this.setState(userData)});
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
                              <label>User Name</label>
                              <input type="user_name"
                                className="form-control"
                                id="userName"
                                placeholder={this.state.name}
                                onChange={(e)=>this.handleNameChange(e)}/>
                          </div>
                          <div className="form-group">
                              <label>Email Address</label>
                              <input type="email_address"
                                className="form-control"
                                id="email"
                                placeholder={this.state.email}
                                onChange={(e) => this.handleEmailChange(e)}/>
                          </div>
                          <div className="form-group">
                            <label>Interests (Please separate by commas)</label>
                            <input type="interests"
                              className="form-control"
                              id="interests"
                              placeholder={this.state.interests}
                              onChange={(e) => this.handleInterestsChange(e)}/>
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
