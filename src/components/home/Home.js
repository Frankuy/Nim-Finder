import React, { Component } from 'react';
import Header from '../common/Header';
import Unauthorized from '../error/Unauthorized';
import ReactTable from 'react-table';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Utils from '../utils/Utils';
import $ from 'jquery';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        search: '',
        firstSearch : true,
        tokenValid : true
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
            window.location.href = '/'
          }
          else {
            this.setState({data : resJson.payload , firstSearch : false})
          }
        }
        );
      }
    }

    render() {
        const columns = [
          {
            Header : 'Name',
            accessor : 'name',
            filterable : false
          },
          {
            Header : 'NIM TPB',
            accessor : 'nim_tpb',
            filterable : false,
            minWidth: 40,
          },
          {
            Header : 'NIM Jurusan',
            accessor : 'nim_jur',
            filterable : false,
            minWidth: 40,
          },
          {
            Header : 'Fakultas',
            accessor : 'prodi',
            id: 'fakultas',
            Cell : ({value}) => Utils.getFakultas(value),
            minWidth : 50,
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

                <Container style={{height: '100vh', paddingTop: this.state.firstSearch ? '200px' : '80px'}}>
                  <Container style={{maxWidth: '800px'}}>
                      <InputGroup>
                          <FormControl
                            placeholder="Enter NIM or name"
                            type='text'
                            onChange={this.searchChange}
                            onKeyDown={this.enterSearch}
                            id='searchBox'
                          />
                          <InputGroup.Append>
                              <Button id='searchButton' type='submit' variant="secondary" onClick={this.handleSearch}><FontAwesomeIcon icon={faSearch}/></Button>
                          </InputGroup.Append>
                      </InputGroup>
                  </Container>
                  <Container style={{padding : '20px'}}>
                    {
                      !this.state.firstSearch && 
                      <ReactTable 
                        className='-highlight  -striped'
                        style={{background : 'white'}}
                        data={this.state.data} 
                        columns={columns} 
                        filterable
                        defaultPageSize={10}
                      />
                    }
                  </Container>
                </Container>
            </>
        );
    }
}
