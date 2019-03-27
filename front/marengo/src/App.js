import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function horses(setRes){
  const axios = require('axios');
  axios.get('http://localhost:5000/horses').then(data => {
    const horsesData = data.data;
    if (horsesData) {
      const horsesFields = horsesData.fields;
      const horsesValues = horsesData.data;
      setRes(horsesFields, horsesValues)
    }
  }).catch(e => console.error(e));
}

function GenericLine(fields, data){
  return (
    fields.map((f, idx) => <td key={idx}>{data[f.key]}</td>)
  );
}

function GenericTable({fields, values}){
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
      horsesFields: null,
      horsesValues: null
    };
    horses((f, v) => this.setState({horsesFields: f, horsesValues: v}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GenericTable
            fields={this.state.horsesFields}
            values={this.state.horsesValues}
          />
        </header>
      </div>
    );
  }
}

export default App;
