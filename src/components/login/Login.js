import React, { Component } from 'react';
import Header from '../common/Header';
import FormUser from '../common/FormUser';
import cookie from 'react-cookies';

export default class Login extends Component {
    state = {
        username: '',
        password: ''
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
        cookie.save(
            'username',
            this.state.username
        )
        window.location.href = '/home'
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