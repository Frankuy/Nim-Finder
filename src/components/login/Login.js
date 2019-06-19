import React, { Component } from 'react';
import Header from '../common/Header';
import FormUser from '../common/FormUser';

export default class Login extends Component {
    render() {
        return (
            <>
                <Header isAuth={false}/>
                <FormUser typeform='Login'/>
            </>
        );
    }
}