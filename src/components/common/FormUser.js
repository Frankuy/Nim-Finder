import React, { Component } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';

export default class FormUser extends Component {
    render() {
        return (
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' , flexDirection: 'column'}}>
                <Container id='whatsWrong' style={{maxWidth: '500px', position: 'fixed', top: '70px', zIndex: 1, fontSize : '0.75em'}}/>
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

                        <Button variant="primary" type="submit">
                            {this.props.typeform}
                        </Button>
                    </Form>
                    <Container>
                        <NavLink style={{fontSize: '0.75em', textAlign: 'center'}} href={this.props.goTo}>{this.props.children}</NavLink>
                    </Container>
                </Card>
            </Container>
        )
    }
}
