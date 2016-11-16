import React from 'react';
import {getUserData} from './../server.js';

export default class Homepage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        user_name: "somebody"
      }
  }

  refresh() {
      console.log(this.state.user_name);
      getUserData(this.props.user, (user_name) => this.setState({user_name:name}));
      console.log(this.state.user_name);

  }

  componentWillMount() {
    console.log(this.state.user_name);
    getUserData("1", (user) => this.setState({user_name:user.name}));
    console.log(this.state.user_name);
  }

  render()
  {
    return (
      <center><h4>Welcome, {this.state.user_name}!</h4></center>
    );
  }
}
