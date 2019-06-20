import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header';
import FormUser from '../common/FormUser';
import cookie from 'react-cookies';
import { Alert } from 'react-bootstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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

    handleLogin = (event) => {
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
        fetch('https://api.stya.net/nim/login',  request)
        .then(response => response.json())
        .then(resJson =>
        {
            if (resJson.code !== 0) {
                ReactDOM.render(<Alert variant='danger' style={{boxShadow : '0px 0px 5px #888888'}}>{resJson.status}</Alert>, document.getElementById('whatsWrong'));
            }
            else {
                cookie.save(
                    'username',
                    this.state.username
                )
                cookie.save(
                    'token',
                    resJson.token
                )
                window.location.href = '/home';
            }
        }
        );
    }

    render() {
        return (
            <>
                <Header isAuth={false} />
                <FormUser typeform='Login' handleSubmit={this.handleLogin} usernameChange={this.usernameChange} passwordChange={this.passwordChange} goTo='/register'>
                    Don't have account? Register
                </FormUser>
            </>
        );
    }
}