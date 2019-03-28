import React, { Component } from 'react';
import './App.css';
import Horses from './lib/Horses';

function GenericLine(fields, data, columnSelected, selectColumn){
  return (
    fields.map((f, idx) => {
      if (columnSelected === idx){
        return (<td key={idx}><input type="text" defaultValue={data[f.key]} /></td>);
      }
      return (<td key={idx} onClick={() => selectColumn(idx)}>{data[f.key]}</td>);
    })
  );
}

class GenericTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowSelected: null,
      columnSelected: null,
    };

    this.selectRow = this.selectRow.bind(this);
    this.selectColumn = this.selectColumn.bind(this);
  }

  selectRow = (id) => this.setState({rowSelected: id});
  selectColumn = (id) => this.setState({columnSelected: id});

  render() {
    const fields = this.props.fields;
    const values = this.props.values;
    
    return (
      <table className="Generic-table">
        <thead>
          <tr>
          {fields &&
            fields.map(field => <th key={field.name}>{field.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((value, idx) => {
              if (idx === this.state.rowSelected) {
                return (
                  <tr key={idx}>{
                    GenericLine(fields, value, this.state.columnSelected, this.selectColumn)
                  }</tr>
                );
              }
              return (
                <tr key={idx} onClick={() => this.selectRow(idx)}>{
                  GenericLine(fields, value, null, this.selectColumn)
                }</tr>
              );
            }
            )}
        </tbody>
      </table>
    );
  }
}

function GenericTableWrapper({fields, values}) {
  return <GenericTable fields={fields} values={values} />
}

function App(){
  return (
    <div className="App">
      <div className="App-body">
        <Horses table={GenericTableWrapper} />
      </div>
    </div>
  )
}

export default App;
