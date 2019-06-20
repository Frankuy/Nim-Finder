import React, { Component } from 'react';
import Header from '../common/Header';
import ReactTable from 'react-table';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Utils from '../utils/Utils';
import $ from 'jquery';
import cookie from 'react-cookies';

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        search: '',
        firstSearch : true
      }
    }
    
    searchChange = (event) => {
      event.preventDefault();
      this.setState({search : event.target.value});
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
            window.location.href = '/'
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
            accessor : 'nim_tpb',
            id: 'fakultas',
            Cell : ({value}) => Utils.getFakultas(value),
            minWidth : 50,
            filterMethod : (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              else {
                return row[filter.id].startsWith(filter.value);
              }
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
                    el => <option value={el['kode']} key={el['kode']}>{el['nama']}</option>
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
        return (
            <>
                <Header isAuth={true} username={this.props.username}/>
            
                <Container style={{marginTop: '80px', maxWidth: '800px'}}>
                    <InputGroup>
                        <FormControl
                          placeholder="Enter NIM or name"
                          type='text'
                          onChange={this.searchChange}
                        />
                        <InputGroup.Append>
                            <Button type='submit' variant="outline-secondary" onClick={this.handleSearch}><FontAwesomeIcon icon={faSearch}/></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Container>

                <Container style={{marginTop : '20px', marginBottom: '50px'}}>
                  {
                    !this.state.firstSearch && 
                    <ReactTable 
                      data={this.state.data} 
                      columns={columns} 
                      filterable
                      defaultPageSize={10}
                    />
                  }
                </Container>
            </>
        )
    }
}
