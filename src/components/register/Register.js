import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header';
import FormUser from '../common/FormUser';
import { Alert } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isRegister : false
        }
    }

    usernameChange = (event) => {
        event.preventDefault();
        this.setState({username : event.target.value});
    }

    passwordChange = (event) => {
        event.preventDefault();
        this.setState({password : event.target.value});
    }

    handleRegister = (event) => {
        event.preventDefault();
        const formData = new URLSearchParams();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        const request = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
            json: true,
        }
        fetch('https://api.stya.net/nim/register',  request)
        .then(response => response.json())
        .then(resJson =>
        {
            if (resJson.code !== 0) {
                ReactDOM.render(<Alert variant='danger'>{resJson.status}</Alert>, document.getElementById('whatsWrong'));
            }
            else {
                this.setState({ isRegister : true});
            }
        }
        );
    }
    
    render() {
        if (cookie.load('token') !== undefined) {
            return (
                <Redirect to='/home' />
            );
        }

        if (this.state.isRegister) {
            return (
                <Redirect to='/' />
            );
        }
        else {
            return (
                <>
                    <Header isAuth={false}/>
                    <FormUser typeform='Register' handleSubmit={this.handleRegister} usernameChange={this.usernameChange} passwordChange={this.passwordChange} goTo='/'>
                        Have an account? Login
                    </FormUser>
                </>
            );
        }
    }
}