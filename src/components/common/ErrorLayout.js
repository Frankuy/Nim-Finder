import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class ErrorLayout extends Component {
    render() {
        return (
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh', flexDirection: 'column'}}>
                <h1 style={{fontSize: '100px'}}>{this.props.code}</h1>
                <h4>{this.props.message}</h4>
            </Container>
        )
    }
}
