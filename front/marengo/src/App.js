import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function horses(setRes){
  const axios = require('axios');
  axios.get('http://localhost:5000/horses').then(r => setRes(r.data));
}

function GenericLine(fields, data){
  return (
    fields.map((f, idx) => <td key={idx}>{data[f.key]}</td>)
  );
}

function GenericTable(data){
  const fields = data.data && data.data.fields;
  const values = data.data && data.data.data;
  return (
    <table>
      <thead>
        <tr>
        {fields &&
          fields.map(field => <th key={field.name}>{field.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {values &&
          values.map((value, idx) => <tr key={idx}>{GenericLine(fields, value)}</tr>)}
      </tbody>
    </table>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      horses: null
    };
    horses(r => this.setState({horses: r}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <GenericTable data={this.state.horses}/>
        </header>
      </div>
    );
  }
}

export default App;
