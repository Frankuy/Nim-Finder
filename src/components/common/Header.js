import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import logo from '../../assets/img/logo.svg';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export default class Header extends Component {    
    constructor(props) {
      super(props);
      this.state = {
        wantLogOut : false
      }
    }

    handleLogout = (event) => {
      event.preventDefault();
      cookie.remove('username');
      cookie.remove('token');
      this.setState({wantLogOut : true, });
    }

    render() {
      if (this.state.wantLogOut) {
        return (
          <Redirect to='/' />
        );
      }

      if (this.props.isAuth) {
        return (
          <Navbar expand="lg" fixed='top'>
              <Navbar.Brand href="https://github.com/Frankuy/Nim-Finder">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
                Nim Finder
              </Navbar.Brand>
              <Navbar.Toggle id='navbarButton'/>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{marginRight: '15px', color: 'black'}}>
                  {this.props.username}
                </Navbar.Text>
                <Button variant='secondary' onClick={this.handleLogout}>Logout</Button>
              </Navbar.Collapse>
          </Navbar>
        );
      }
      else {
        return (
          <Navbar expand="lg" fixed='top'>
              <Navbar.Brand href="https://github.com/Frankuy/Nim-Finder">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
                Nim Finder
              </Navbar.Brand>
          </Navbar>
        );
      }
    }
}