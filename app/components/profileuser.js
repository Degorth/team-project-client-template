import React from 'react';
import {Link} from 'react-router';
import {getUserData} from '../server.js';

export default class UserInfo extends React.component {
  this.data = getUserData(4, cb);

  handleAddPhoto(e) {
    this.photo = "../img/default.jpg"
  }

  render() {
    return(
      <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-3">
          <div class="panel panel-default">
              <div class="panel-body">
                <div class="card">
                  <img class="card-img-top" src="img/identicon.png" id="profile-image" width="250px" alt="Personal Photo">
                  <div class="card-block">
                    <p class="card-text"></p>
                      <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#photoModal">
                        <span class="glyphicon glyphicon-camera"></span> Edit Photo
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-7">
            <div class="panel panel-default">
              <div class="panel-body" id="user-info">
                <a class="btn btn-secondary pull-right" href="#" role="button" onClick={(e) => handleEditProfile(e)}>
                  <span class="glyphicon glyphicon-edit"></span> Edit</a>
                    <h4>{this.name} </h4>
                    <h5>Contact Info: </h5><p>{this.email}</p>
                    <h5>Interests: </h5><p>{this.interests}</p>
                </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="btn-group pull-right" role="group">
                  <a class="btn btn-secondary" href="profileorg.html" role="button">
                  <span class="glyphicon glyphicon-hand-up"></span> Manage My Groups</a>
                  <a class="btn btn-primary" href="groupscreate.html" role="button">
                  <span class="glyphicon glyphicon-plus"></span> Create A New Event Group</a>
                </div>
                <div id = "my-groups">
                  <script type="text/babel">
                    ReactDOM.render(<h1>Hello World</h1>, document.getElementById('my-groups'));
                  </script>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="photoModal" tabindex="-1" role="dialog" aria-labelledby="photoModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={(e) => handleAddPhoto(e)}>
                  <h4 class="modal-title" id="photoModalLabel">Choose a Photo . . .</h4>
                </button>
              </div>
              <div class="modal-body">
                <input type="file" id="files" name="files[]" multiple />
                <img src="img/identicon.png" id="profile-img-thumbnail" width="150px" alt="Profile Image" />
              </div>
            </div>
          </div>
        </div>
    )
  }
}
