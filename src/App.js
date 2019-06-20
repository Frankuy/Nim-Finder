import React, { Component } from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import NotFound from './components/error/NotFound';
import Unauthorized from './components/error/Unauthorized';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import cookie from 'react-cookies';

export default class App extends Component {
  render() {
    if (cookie.load('token') === undefined) {
      return (
        <Router>
          <Switch>
            <Route
              path='/'
              exact
              component={Login}
            >
            </Route>
            <Route 
              path='/register' 
              component={Register} 
            />
            <Route
              path='/home'
              component={Unauthorized}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      );
    }
    return (
      <Router>
        <Switch>
          <Route 
            path='/home'
            render={() => <Home username={cookie.load('username')}/>}
          />
          <Redirect from='/' to='/home' />
          <Redirect from='/register' to='/home' />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
