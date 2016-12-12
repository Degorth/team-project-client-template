import React from 'react';
import {Link} from 'react-router';
import {getUserData,getUserGroups} from '../server.js';

export default class UserProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          user_name: undefined,
          user_email: undefined,
          user_interests: [],
          groups: []
      }
  }

  componentWillMount() {
    getUserData(this.props.user, (user) => this.setState(
      {user_name:user.name, user_email:user.email, user_interests:user.interests}));
  }

  displayGroups() {
    getUserGroups(this.props.user, (group) => this.setState({groups: group}));
    return (
        <div className="groupList">
            {this.state.groups.map((gr) => {
                return (<li key={gr._id}>{gr.name}</li>)
            })}
        </div>
    );
  }

  render() {
    return(
      <div>
          <div className="col-md-7">
            <div className="panel panel-default">
              <div className="panel-body" id="user-info">
                <Link to="/profileedit" className="btn btn-secondary pull-right" role="button">
                  <span className="glyphicon glyphicon-edit"></span>
                  Edit
                </Link>
                <h4>{this.state.user_name} </h4>
                <h5>Contact Info: {this.state.user_email}</h5>
                <h5>Interests: {this.state.user_interests.toString()}</h5>
                </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-body">
                <div className="btn-group pull-right" role="group">
                  <Link to="/profilegroupedit" className="btn btn-secondary">
                    <span className="glyphicon glyphicon-hand-up"></span>Manage My Groups
                  </Link>
                  <a className="btn btn-primary" href="#" role="button">
                  <span className="glyphicon glyphicon-plus"></span> Create A New Event Group</a>
                </div>
                <div id = "my-groups">
                  <h4>My Groups</h4>
                    {this.displayGroups()}
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

/*

<div className="row">
<div className="col-md-1">
</div>
<div className="col-md-3">
  <div className="panel panel-default">
      <div className="panel-body">
        <div className="card">
          <img className="card-img-top" src="img/identicon.png" id="profile-image" width="250px" alt="Personal Photo"></img>
          <div className="card-block">
            <p className="card-text"></p>
              <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#photoModal">
                <span className="glyphicon glyphicon-camera"></span> Edit Photo
              </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>


<div className="modal fade" id="photoModal" tabindex="-1" role="dialog" aria-labelledby="photoModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <h4 className="modal-title" id="photoModalLabel">Choose a Photo . . .</h4>
        </button>
      </div>
      <div className="modal-body">
        <input type="file" id="files" name="files[]" multiple />
        <img src="img/identicon.png" id="profile-img-thumbnail" width="150px" alt="Profile Image" />
      </div>
    </div>
  </div>
</div>


*/
