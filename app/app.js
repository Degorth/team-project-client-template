import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Link, Router, Route, browserHistory} from 'react-router';

import bored from './components/bored.js';


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={Container}>
        <IndexRoute component={bored} />

      </Route>
    </Router>
), document.getElementById('ugo-app'));

const navbar = () => (
  <div>
    <Link to='/'>Home</Link>&nbsp;

  </div>
)

const Container = (props) => <div>
  <navbar />
  {props.children}
</div>
