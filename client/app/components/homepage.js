import React from 'react';
import {getUserData} from './../server.js';

export default class Homepage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        user_name: undefined,
        past_events: []
      }
  }

  componentWillMount() {
    getUserData(this.props.user, (user) => this.setState({user_name:user.name}));
  }

  displayPastEvents() {

  }

  render()
  {
    return (
      <div>
        <center><h4>Welcome, {this.state.user_name}!</h4></center>
          <div className="row">
              {this.displayPastEvents()}
          </div>
     </div>
    );
  }
}
