import React, { Component } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import logo from '../../assets/img/logo.svg';

export default class Header extends Component {    
    render() {
      if (this.props.isAuth) {
        return (
          <Navbar bg="light" expand="lg" fixed='top'>
              <Navbar.Brand href="/" style={{fontFamily: 'Alegreya Sans SC, sans-serif'}}>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
                Nim Finder
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{marginRight: '15px'}}>
                  {this.props.username}
                </Navbar.Text>
                <Button variant='danger'>Logout</Button>
              </Navbar.Collapse>
          </Navbar>
        );
      }
      else {
        return (
          <Navbar bg="light" expand="lg" fixed='top'>
              <Navbar.Brand href="/" style={{fontFamily: 'Alegreya Sans SC, sans-serif'}}>
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