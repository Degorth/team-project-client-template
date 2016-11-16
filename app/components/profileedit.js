import React from 'react';
import {getUserData, setUserData} from '../server.js';

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_value: "",
      email_value: "",
      interests_value: "",
      data: {
        _id: "",
        name: "",
        email: "",
        groups: [],
        interests: "",
        photo: "",
        events: []
      }
    }
  }

  componentWillMount() {
    getUserData(this.props.user, (user) => this.setState(
    user));
    this.setState({name_value: this.user_name, email_value: this.user_email, interests_value: this.user_interests});
  }

  handleChange(e, field) {
      e.preventDefault();
      this.setState({field: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.data.setState({
      "_id": this.state._id,
      "name": this.name_value,
      "email": this.email_value,
      "groups": this.state.groups,
      "interests": this.interests_value,
      "photo": this.state.photo,
      "events": this.state.events
    })
    setUserData(this.data._id, (this.data));
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
                                value={this.state.name_value}
                                onChange={(e)=>this.handleChange(e,"name_value")}/>
                          </div>
                          <div className="form-group">
                              <label>Email Address</label>
                              <input type="email_address"
                                className="form-control"
                                id="email"
                                placeholder={this.state.email}
                                value={this.state.email_value}
                                onChange={(e) => this.handleChange(e, "email_value")}/>
                          </div>
                          <div className="form-group">
                            <label>Interests (Please separate by commas)</label>
                            <input type="interests"
                              className="form-control"
                              id="interests"
                              placeholder={this.state.interests}
                              value={this.state.interests_value}
                              onChange={(e) => this.handleChange(e, "interests_value")}/>
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
