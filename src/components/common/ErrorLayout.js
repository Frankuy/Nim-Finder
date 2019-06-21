import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class ErrorLayout extends Component {
    render() {
        return (
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh', flexDirection: 'column'}}>
                <h1 style={{fontSize: '10em'}}>{this.props.code}</h1>
                <h4 style={{fontSize: '2em'}}>{this.props.message}</h4>
            </Container>
        )
    }
}
