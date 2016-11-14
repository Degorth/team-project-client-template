import React from 'react';
import {getUserData} from '../server.js'

export default class UserInfo extends React.component {

  this.data = getUserData(4, cb)

  render() {
    return(
      <h4> {this.name} </h4>
      <h5> Contact Info : </h5><p> {this.email} </p>
      <h5> Interests : </h5><p> {this.interests} </p>
    )
  }
}
