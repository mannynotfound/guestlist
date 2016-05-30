import React from 'react'
import {Route, Router, browserHistory, IndexRoute} from 'react-router'
import App from '../containers/App/App'
import Home from '../containers/Home/Home'
import Login from '../containers/Login/Login'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login}/>
    </Route>
  </Router>
)
