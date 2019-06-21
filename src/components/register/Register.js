import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header';
import FormUser from '../common/FormUser';
import { Alert } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { Spring, config } from 'react-spring/renderprops';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isRegister : false,
            loading: false
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
                ReactDOM.render(
                    <Spring
                        from={{opacity : 1}}
                        to={{opacity : 0}}
                        key={Math.random()}
                        config={{ delay: 3000 }} 
                    >
                        { 
                            props => (
                                <div style={props}>
                                    <Alert variant='danger' style={{boxShadow : '0px 0px 5px #888888'}}>{resJson.status}</Alert>
                                </div>
                            )
                        }
                    </Spring>
                    ,document.getElementById('whatsWrong')
                );
                this.setState({ loading : false });
            }
            else {
                this.setState({ isRegister : true, loading : false });
            }
        }
        );
        this.setState({loading : true});
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
                    <Spring
                        from={{ opacity: 0, paddingBottom: '500px',  height: '100vh' , flexDirection: 'column'}}
                        to={{opacity: 1, paddingBottom: '0px',  height: '100vh' , flexDirection: 'column'}}
                        config={config.molasses}
                    >
                        {
                            props => (
                                <FormUser loading={this.state.loading} typeform='Register' handleSubmit={this.handleRegister} usernameChange={this.usernameChange} passwordChange={this.passwordChange} goTo='/' style={props}>
                                    Have an account? Login
                                </FormUser>
                            )   
                        }
                    </Spring>
                </>
            );
        }
    }
}