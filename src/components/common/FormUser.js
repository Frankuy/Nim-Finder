import React, { Component } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

export default class FormUser extends Component {
    render() {
        return (
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <Card>
                    <Card.Header>{this.props.typeform.toUpperCase()}</Card.Header>
                    <Form style={{ padding: 20 }}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {this.props.typeform}
                        </Button>
                    </Form>
                </Card>
            </Container>
        )
    }
}
