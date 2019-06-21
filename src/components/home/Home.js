import React, { Component } from 'react';
import Header from '../common/Header';
import Unauthorized from '../error/Unauthorized';
import ReactTable from 'react-table';
import { Container, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Utils from '../utils/Utils';
import $ from 'jquery';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import {Spring, config} from 'react-spring/renderprops';

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        search: '',
        firstSearch : true,
        tokenValid : true,
        loading : false
      }
    }
    
    searchChange = (event) => {
      event.preventDefault();
      this.setState({search : event.target.value});
    }

    enterSearch = (event) => {
      if (event.keyCode === 13) {
        document.getElementById('searchButton').click()
      }
    }

    handleSearch = (event) => {
      event.preventDefault();
      const request = {
        method: 'GET',
        headers: {
            "Auth-Token": cookie.load('token')
        }
      }

      if (this.state.search.match(/\d+/g)) {
        fetch(`https://api.stya.net/nim/byid?query=${this.state.search}&count=2000`, request)
        .then( response => response.json())
        .then( resJson => {
          if (resJson.code === -2) { //Token not valid anymore
            cookie.remove('token')
            cookie.remove('username')
            this.setState({tokenValid : false});
          }
          else {
            this.setState({data : resJson.payload , firstSearch : false})
          }
        }
        ); 
      }
      else {
        fetch(`https://api.stya.net/nim/byname?name=${this.state.search}&count=2000`, request)
        .then( response => response.json())
        .then( resJson => {
          if (resJson.code === -2) { //Token not valid anymore
            cookie.remove('token')
            cookie.remove('username')
            this.setState({tokenValid : false});
          }
          else {
            this.setState({data : resJson.payload , firstSearch : false, loading : false})
          }
        }
        );
        this.setState({loading : true});
      }
    }

    render() {
        const columns = [
          {
            Header : 'Name',
            accessor : 'name',
            filterable : false,
            headerStyle: {background:'#274060', color : 'white'}
          },
          {
            Header : 'NIM TPB',
            accessor : 'nim_tpb',
            filterable : false,
            minWidth: 40,
            headerStyle: {background:'#274060', color : 'white'}
          },
          {
            Header : 'NIM Jurusan',
            accessor : 'nim_jur',
            minWidth: 40,
            headerStyle: {background:'#274060', color : 'white'},
            filterMethod: (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              else {
                return row[filter.id].substring(3,5) === filter.value;
              }
            },
            Filter: ({ filter, onChange }) =>
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
                id='angkatan'
              >
                <option value='all'>Show All</option>
                <option value='18'>2018</option>
                <option value='17'>2017</option>
                <option value='16'>2016</option>
                <option value='15'>2015</option>
                <option value='14'>2014</option>
                <option value='13'>2013</option>
              </select>
          },
          {
            Header : 'Fakultas',
            accessor : 'prodi',
            id: 'fakultas',
            Cell : ({value}) => Utils.getFakultas(value),
            minWidth : 50,
            headerStyle: {background:'#274060', color : 'white'},
            filterMethod : (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              else {
                return Utils.getFakultas(row[filter.id]) === filter.value;
              }
            },
            sortMethod: (a, b, desc) => {
              if (Utils.getFakultas(a) > Utils.getFakultas(b)) {
                return 1;
              }
              if (Utils.getFakultas(a) < Utils.getFakultas(b)) {
                return -1;
              }
              return 0;
            },
            Filter: ({ filter, onChange }) =>
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
                id='fakultasSelect'
              >
                <option value='all'>Show All</option>
                {
                  Utils.getListNamaFakultas().map(
                    el => <option value={el['nama']} key={el['kode']}>{el['nama']}</option>
                  )
                }
              </select>
          },
          {
            Header : 'Program Studi',
            accessor : 'prodi',
            id: 'programstudi',
            headerStyle: {background:'#274060', color : 'white' },
            filterMethod : (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              else {
                return row[filter.id] === filter.value;
              }
            },
            Filter: ({ filter, onChange }) =>
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
                id='prodiSelect'
              >
                <option value="all">Show All</option>
                {
                  $('#fakultasSelect').val() !== undefined && $('#fakultasSelect').val() !== 'all' &&
                  Utils.getListProdi($('#fakultasSelect').val()).map(
                    el => <option value={el} key={el}>{el}</option>
                  )
                }
              </select>
          }
        ]
        if (cookie.load('token') === undefined) {
          return (
            <Unauthorized />
          );
        }
        
        if (!this.state.tokenValid) {
          return (
            <Redirect to='/'/>
          );
        }
        return (
            <>
                <Header isAuth={true} username={this.props.username} />

                <Container style={{height: '100vh', paddingTop: this.state.firstSearch ? '200px' : '80px', transition: 'padding 0.5s'}}>
                  <Spring
                    from={ {paddingTop: '200px', maxWidth : '800px'}}
                    to={ {paddingTop: '0px', maxWidth : '800px'}}
                    config={config.molasses}
                  >
                    {
                      props => (
                        <Container style={props}>
                            <InputGroup style={{marginBottom : '20px'}}>
                                <FormControl
                                  placeholder="Enter NIM or name"
                                  type='text'
                                  onChange={this.searchChange}
                                  onKeyDown={this.enterSearch}
                                  id='searchBox'
                                  autoComplete='off'
                                />
                                <InputGroup.Append>
                      <Button id='searchButton' type='submit' variant="secondary" onClick={this.handleSearch}>{this.state.loading ? <Spinner animation="border" variant='light' size='sm' /> : <FontAwesomeIcon icon={faSearch}/>}</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Container>
                      )
                    }
                  </Spring>
                  <Container style={{paddingBottom : '50px'}}>
                    {
                      !this.state.firstSearch && 
                      <ReactTable 
                        className='-highlight  -striped'
                        style={{background : 'white'}}
                        data={this.state.data} 
                        columns={columns} 
                        filterable
                        defaultPageSize={10}
                        loading={this.state.loading}
                      />
                    }
                  </Container>
                </Container>
            </>
        );
    }
}
