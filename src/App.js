import React, { Component } from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import NotFound from './components/error/NotFound';
import { Route, Switch } from "react-router-dom";
import './App.css';
import cookie from 'react-cookies';
import './assets/js/style';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path='/'
          exact
          component={Login}
        />
        <Route 
          path='/register' 
          component={Register}
        />
        <Route 
          path='/home'
          render={() => <Home username={cookie.load('username')}/>}
        />
        <Route component={NotFound} />
      </Switch>
    );
  //   if (cookie.load('token') === undefined) {
  //     return (
  //       <Router basename={process.env.PUBLIC_URL}>
  //         {/* <Switch>
  //           <Route
  //             path='/'
  //             exact
  //             component={Login}
  //           >
  //           </Route>
            // <Route 
            //   path='/register' 
            //   component={Register} 
            // />
  //           <Route
  //             path='/home'
  //             component={Unauthorized}
  //           />
  //           <Route component={NotFound} />
  //         </Switch> */}
  //       </Router>
  //     );
  //   }
  //   return (
  //     <Router basename={process.env.PUBLIC_URL}>
  //       {/* <Switch>
  //         <Route 
  //           path='/home'
  //           render={() => <Home username={cookie.load('username')}/>}
  //         />
  //         <Redirect from='/' to='/home' />
  //         <Redirect from='/register' to='/home' />
  //         <Route component={NotFound} />
  //       </Switch> */}
  //     </Router>
  //   );
  }
}
