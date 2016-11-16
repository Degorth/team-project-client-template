import React from 'react';
import {getUserData} from './../server.js';

export default class Homepage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        user_name: undefined
      }
  }

  componentWillMount() {
    getUserData(this.props.user, (user) => this.setState({user_name:user.name}));
  }

  render()
  {
    return (
      <center><h4>Welcome, {this.state.user_name}!</h4></center>
    );
  }
}
