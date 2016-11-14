import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Link, Router, Route, browserHistory} from 'react-router';

import bored from './components/bored.js';
import Schedule from './components/schedule.js';
//import upcoming from './components/upcoming.js';
import homepage from './components/homepage.js';
import eventssearch from './components/eventssearch.js';
import eventscreate from './components/eventscreate.js';
//import profileuser from './components/profileuser.js';

class ScheduleContainer extends React.Component{
  render(){
    return(<Schedule user={1}/>);
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
        <IndexRoute component={homepage} />
        <Route path='/schedule' component={ScheduleContainer}></Route>
        <Route path='/bored' component={bored}></Route>
        <Route path='/eventssearch' component={eventssearch}></Route>
        <Route path='/eventscreate' component={eventscreate}></Route>
      </Route>
    </Router>
), document.getElementById('ugo-app'));
/*
ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={Container}>
        <IndexRoute component={homepage} />
        <Route path='/upcoming' component={upcoming}></Route>
        <Route path='/schedule' component={ScheduleContainer}></Route>
        <Route path='/bored' component={bored}></Route>
        <Route path='/eventssearch' component={eventssearch}></Route>
        <Route path='/eventscreate' component={eventscreate}></Route>
        <Route path='/profileuser' component={profileuser}></Route>
      </Route>
    </Router>
), document.getElementById('ugo-app'));
*/
