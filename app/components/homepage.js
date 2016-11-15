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
      getUserData(this.props.user, (user_name) => this.setState({name: user_name}));
      console.log(this.state.user_name);

  }

  componentDidMount() {
      this.refresh();
  }

  render()
  {
    return (
      <rowcenter><h4>Welcome, user {this.state.user_name}!</h4></rowcenter>
    );
  }
}
