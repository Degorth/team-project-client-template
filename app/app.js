import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Link, Router, Route, browserHistory} from 'react-router';

import Bored from './components/bored.js';
import Schedule from './components/schedule.js';
//import upcoming from './components/upcoming.js';
import Homepage from './components/homepage.js';
import EventsSearch from './components/eventssearch.js';
import EventsCreate from './components/eventscreate.js';
//import profileuser from './components/profileuser.js';
import UnimplementedReactComponent from './components/UnimplementedReactComponent.js';

class boredContainer extends React.Component{
  render(){
    return(<Bored />);
  }
}

class ScheduleContainer extends React.Component{
  render(){
    return(<Schedule user={1}/>);
  }
}

class upcomingContainer extends React.Component{
  render(){
    return(<UnimplementedReactComponent/>);
  }
}

class homepageContainer extends React.Component{
  render(){
    return(<Homepage/>);
  }
}

class eventssearchContainer extends React.Component{
  render(){
    return(<EventsSearch/>);
  }
}

class eventscreateContainer extends React.Component{
  render(){
    return(<EventsCreate/>);
  }
}

class profileuserContainer extends React.Component{
  render(){
    return(<UnimplementedReactComponent/>);
  }
}
const Navbar = () => (
  <div>
    <Link to='/'>Home</Link>
    <Link to='/schedule'>My Scheule</Link>
    <Link to='/upcoming'>Upcoming</Link>
    <Link to='/bored'>I'm Bored</Link>
    <Link to='/eventssearch'>Events</Link>
    <Link to='/profileuser'>My Profile</Link>
    <Link to='/eventscreate'>Create A New Event</Link>
  </div>
)
//<Link to='/'>Home</Link>&nbsp;
class Container extends React.Component {
  render(){
    return(
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={Container}>
        <IndexRoute component={homepageContainer} />
        <Route path='/upcoming' component={upcomingContainer}></Route>
        <Route path='/schedule' component={ScheduleContainer}></Route>
        <Route path='/bored' component={boredContainer}></Route>
        <Route path='/eventssearch' component={eventssearchContainer}></Route>
        <Route path='/eventscreate' component={eventscreateContainer}></Route>
        <Route path='/profileuser' component={profileuserContainer}></Route>
      </Route>
    </Router>
), document.getElementById('ugo-app'));
