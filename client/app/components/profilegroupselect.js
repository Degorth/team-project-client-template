import React from 'react';
import {setUserGroups, getGroups} from '../server.js';

export default class ProfileGroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.user,
      groups: [],
      userGroups: []
    }
  }

  /*componentWillMount() {
    getGroups((groups) => this.setState({"groups": groups}));
  }*/

  /*toggleCheckbox(val) {
    if(this.groups.has(val)) {
      this.groups.delete(val);
    } else {
      this.groups.push(val);
    }

    this.groups.sort();
  }*/

  handleChange(e, value) {
    e.preventDefault();
    var groups = this.state.userGroups;

    if (e.target.checked) {
      groups.push(value)
    } else {
      var index = groups.indexOf(value)
      groups.splice(index, 1)
    }
    groups.sort();
    this.setState({"userGroups": groups})
  }

  /*handleChange(checkbox, value) {
      if (checkbox.target.checked) {
          var arrayvar = this.state.userGroups.slice()
          arrayvar.push(value)
          //this.setState({groups: arrayvar})
      } else {
          arrayvar = this.state.userGroups.slice()
          arrayvar = arrayvar.filter((v) => v !== value);
          //this.setState({groups: arrayvar})
      }
      arrayvar.sort();
      this.setState({userGroups: arrayvar})
  }*/

  handleSubmit(e) {
    e.preventDefault();
    setUserGroups(this.state._id, this.state.userGroups, (userData) => {this.setState(userData)});
  }

  displayGroups() {
    getGroups((group) => this.setState({groups: group}));
    return (
        <div className="form-check">
            {this.state.groups.map((gr) => {
                return (<label className="form-check-label">
                  <input type="checkbox" className="form-check-input" onClick={(e) => this.handleChange(e, gr._id)} key={gr._id}/>{gr.name}</label>)
            })}
        </div>
    );
  }

  render() {
    return(
      <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
              <div className="panel panel-default">
                  <div className="panel-body">
                      <form>
                          {this.displayGroups()}
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
