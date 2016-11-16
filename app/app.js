import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Link, Router, Route, browserHistory} from 'react-router';

import Bored from './components/bored.js';
import Schedule from './components/Schedule.js';
//import Upcoming from './components/upcoming.js';
import Homepage from './components/homepage.js';
import EventsSearch from './components/eventssearch.js';
import EventsCreate from './components/eventscreate.js';
import UserProfile from './components/profileuser.js';
import ProfileEdit from './components/profileedit.js';
import ReactComponentException from './components/ReactComponentException.js';

var curUser = 1;

class boredContainer extends React.Component {
    render() {
        return (<Bored user={curUser}/>);
    }
}

class ScheduleContainer extends React.Component {
    render() {
        return (<Schedule user={curUser}/>);
    }
}

class upcomingContainer extends React.Component {
    render() {
        //return (<Upcoming user={curUser} />);
        return(<ReactComponentException type="1"/>);
    }
}

class homepageContainer extends React.Component {
    render() {
        return (<Homepage user={curUser}/>);
    }
}

class eventssearchContainer extends React.Component {
    render() {
        return (<EventsSearch user={curUser}/>);
    }
}

class eventscreateContainer extends React.Component {
    render() {
        return (<EventsCreate/>);
    }
}

class profileuserContainer extends React.Component {
    render() {
        //return (<ProfileUser/>);
        return(<UserProfile user={curUser}/>);
    }
}

class profileeditContainer extends React.Component {
  render() {
    return(<ProfileEdit user={curUser}/>);
  }
}

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to='/'>UGo</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/schedule'>My Schedule</Link>
                        </li>

                        <li>
                            <Link to='/upcoming'>Upcoming</Link>
                        </li>
                        <li>
                            <Link to='/bored'>I'm Bored</Link>
                        </li>
                        <li>
                            <Link to='/eventssearch'>Events</Link>
                        </li>
                    </ul>
                    <div className="btn-group-vertical pull-right" role="group">
                        <Link className="btn btn-primary" to='/profileuser'>
                            <span className="glyphicon glyphicon-user"></span>
                            My Profile</Link>
                        <Link className="btn btn-primary" to='/eventscreate'>
                            <span className="glyphicon glyphicon-plus"></span>Create A New Event</Link>
                    </div>
                </div>
            </nav>
        );
    }
}

class Container extends React.Component {
    render() {
        return (
            <div>
                <Navbar/> {this.props.children}
            </div>
        )
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path='/' component={Container}>
            <IndexRoute component={homepageContainer}/>
            <Route path='/upcoming' component={upcomingContainer}></Route>
            <Route path='/schedule' component={ScheduleContainer}></Route>
            <Route path='/bored' component={boredContainer}></Route>
            <Route path='/eventssearch' component={eventssearchContainer}></Route>
            <Route path='/eventscreate' component={eventscreateContainer}></Route>
            <Route path='/profileuser' component={profileuserContainer}></Route>
            //<Route path='/profileedit' component={profileeditContainer}></Route>
        </Route>
    </Router>
), document.getElementById('ugo-app'));
