import React, { Component } from 'react';
import Header from '../common/Header';
import FormUser from '../common/FormUser';

export default class Register extends Component {
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

    handleRegister = (event) => {
        event.preventDefault();
        window.location.href = '/';
    }
    
    render() {
        return (
            <>
                <Header isAuth={false}/>
                <FormUser typeform='Register' handleSubmit={this.handleRegister} goTo='/'>
                    Have an account? Login
                </FormUser>
            </>
        );
    }
}