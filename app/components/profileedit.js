import React from 'react';
import {getUserData, setUserData} from '../server.js';

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.user,
      name_value: "",
      email_value: "",
      interests_value: []
    }
    //window.alert(JSON.stringify(this.state, null, 4));
  }

  componentWillMount() {
    getUserData(this.props.user, (user) => this.setState({
      name: user.name, email: user.email, interests: user.interests
    }));
    //this.setState({name_value: data.name, email_value: data.email, interests_value: data.interests});

  }

  handleNameChange(e) {
      e.preventDefault();
      this.setState({"user_name": e.target.value});
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({"user_email": e.target.value});
  }

  handleInterestsChange(e) {
    e.preventDefault();
    this.setState({"user_interests": e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    //window.alert("Adding: " + this.state._id + " " + this.state.user_name + " " + this.state.user_email + " " + this.state.user_interests);
    setUserData(this.state._id, this.state.user_name, this.state.user_email,
      this.state.user_interests, (userData) => {this.setState(userData)});
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
                                onChange={(e)=>this.handleNameChange(e,"name_value")}/>
                          </div>
                          <div className="form-group">
                              <label>Email Address</label>
                              <input type="email_address"
                                className="form-control"
                                id="email"
                                placeholder={this.state.email}
                                onChange={(e) => this.handleEmailChange(e, "email_value")}/>
                          </div>
                          <div className="form-group">
                            <label>Interests (Please separate by commas)</label>
                            <input type="interests"
                              className="form-control"
                              id="interests"
                              placeholder={this.state.interests}
                              onChange={(e) => this.handleInterestsChange(e, "interests_value")}/>
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
