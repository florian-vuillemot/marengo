import React, { Component } from 'react';
import './App.css';
import Horses from './lib/Horses';

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

function App(){
  return (
    <div className="App">
      <div className="App-body">
        <Horses table={GenericTable} />
      </div>
    </div>
  )
}

export default App;
