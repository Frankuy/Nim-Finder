import React, { Component } from 'react';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class FormUser extends Component {
    render() {
        return (
            <Container className='d-flex justify-content-center align-items-center formContainer' style={this.props.style}>
                <Container id='whatsWrong' style={{maxWidth: '500px', position: 'fixed', top: '50px', zIndex: 1, fontSize : '0.75em'}}/>
                <Card>
                    <Card.Header as='h1'>{this.props.typeform.toUpperCase()}</Card.Header>
                    <Form style={{ padding: 20 }} onSubmit={this.props.handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={this.props.usernameChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={this.props.passwordChange}/>
                        </Form.Group>

                        <Button variant="secondary" type="submit">
                            {this.props.loading ? <Spinner animation="border" variant='light' size='sm' /> : this.props.typeform}
                        </Button>
                    </Form>
                    <Container style={{textAlign : 'center', paddingBottom : '10px'}}>
                        <Link className='nav-link' to={this.props.goTo} style={{fontSize: '0.75em'}}>{this.props.children}</Link>
                    </Container>
                </Card>
            </Container>
        )
    }
}
