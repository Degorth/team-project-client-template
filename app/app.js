import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';


class App extends React.Component {
    render() {
        return (
          <div />
        )
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>
), document.getElementById('ugo-app'));
