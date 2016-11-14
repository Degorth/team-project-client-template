import React from 'react';
import ReactDOM from 'react-dom';
import Schedule from './components/schedule.js';

ReactDOM.render(<Schedule user={1}/>, document.getElementById('ugo-app'));
/*
import {IndexRoute, Link, Router, Route, browserHistory} from 'react-router';

import bored from './components/bored.js';
import Schedule from './components/schedule.js';
import upcoming from './components/upcoming.js';
import homepage from './components/homepage.js';
import eventssearch from './components/eventssearch.js';
import eventscreate from './components/eventscreate.js';
import profileuser from './components/profileuser.js';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={Container}>
        <IndexRoute component={homepage} />
        <Route path='/schedule' component={schedule}></Route>
        <Route path='/upcoming' component={upcoming}></Route>
        <Route path='/bored' component={bored}></Route>
        <Route path='/eventssearch' component={eventssearch}></Route>
        <Route path='/eventscreate' component={eventscreate}></Route>
        <Route path='/profileuser' component={profileuser}></Route>
      </Route>
    </Router>
), document.getElementById('ugo-app'));

const navbar = () => (
  <div>
    <Link to='/'>Home</Link>&nbsp;
    <Link to='/schedule'>My Scheule</Link>
    <Link to='/upcoming'>Upcoming</Link>
    <Link to='/bored'>I'm Bored</Link>
    <Link to='/eventssearch'>Events</Link>
    <Link to='/profileuser'>My Profile</Link>
    <Link to='/eventscreate'>Create A New Event</Link>
  </div>
)

const Container = (props) => <div>
  <navbar />
  {props.children}
</div>
*/
