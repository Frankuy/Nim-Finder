import React, { Component } from 'react';
import Header from '../common/Header';
import ReactTable from 'react-table';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
}]

export default class Home extends Component {
    state = {
        data : [
            {
                name: 'Tanner Linsley',
                age: 26,
                friend: {
                  name: 'Jason Maurer',
                  age: 23,
                }
            },
            {
                name: 'Tanner Linsley',
                age: 26,
                friend: {
                  name: 'Jason Maurer',
                  age: 23,
                }
            }
        ]
    }
    
    render() {
        return (
            <>
                <Header isAuth={true} username={this.props.username}/>
                
                <Container style={{marginTop: '80px', maxWidth: '800px'}}>
                    <InputGroup>
                        <FormControl
                          placeholder="Enter NIM or name"
                          aria-label="Enter NIM or name"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary"><FontAwesomeIcon icon={faSearch}/></Button>
                        </InputGroup.Append>
                        <InputGroup.Append>
                            <Button variant="outline-secondary"><FontAwesomeIcon icon={faFilter}/></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Container>

                <Container style={{marginTop : '20px', marginBottom: '20px'}}>
                  <ReactTable data={this.state.data} columns={columns} />
                </Container>
            </>
        )
    }
}
