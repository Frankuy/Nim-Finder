import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header';
import FormUser from '../common/FormUser';
import { Alert } from 'react-bootstrap';

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
        console.log(this.state.username)
        console.log(this.state.password)
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
                console.log(resJson.status)
                ReactDOM.render(<Alert variant='danger'>{resJson.status}</Alert>, document.getElementById('whatsWrong'));
            }
            else {
                window.location.href = '/'
            }
        }
        );
    }
    
    render() {
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