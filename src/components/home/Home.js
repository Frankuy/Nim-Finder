import React, { Component } from 'react';
import Header from '../common/Header';
import ReactTable from 'react-table';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Utils from '../utils/Utils';
import $ from 'jquery';

export default class Home extends Component {
    state = {
        data : [],
    }
    
    handleSearch = (event) => {
      event.preventDefault();
      this.setState({
        data : [
            {
              name:"Yudhistira Qasthari Putra",
              nim_tpb:"16517369",
              nim_jur:"18217003",
              prodi:"Sistem dan Teknologi Informasi"
            },
            {
              name:"Jason Alfian Hartanto",
              nim_tpb:"16517180",
              nim_jur:"18217004",
              prodi:"Sistem dan Teknologi Informasi"
            }
        ]
      })
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
                          aria-label="Enter NIM or name"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.handleSearch}><FontAwesomeIcon icon={faSearch}/></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Container>

                <Container style={{marginTop : '20px', marginBottom: '50px'}}>
                  {
                    this.state.data.length !== 0 && 
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
