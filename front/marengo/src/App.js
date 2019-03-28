import React, { Component } from 'react';
import './App.css';
import Horses from './lib/Horses';

const GenericValue = (fields, data, selectColumn, columnSelected) =>
  fields.map((f, idx) => {
    const value = data[f.key] || null;
    const _td = rd => <td key={idx} onClick={() => selectColumn(idx)}>{rd}</td>;
    const _input = () => <input type="text" defaultValue={value} />;
    return _td(columnSelected === idx ? _input() : value);
  });

const GenericValues = (fields, values, selectRow, selectColumn, rowSelected, columnSelected, idxStart) =>
  values.map((value, idx) => {
    const _idx = idxStart + idx;
    const _tr = _td => <tr key={_idx} onClick={() => selectRow(_idx)} >{_td}</tr>;
    const _columnSelected = _idx === rowSelected ? columnSelected : null;
    return _tr(GenericValue(fields, value, selectColumn, _columnSelected));
  });

const getViewFields = (fields) => (fields && fields.map(field => <th key={field.name}>{field.name}</th>));

class GenericTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowSelected: null,
      columnSelected: null,
    };
  }

  render() {
    const fields = this.props.fields || [];
    const values = this.props.values || [];
    const rowSelected = this.state.rowSelected;
    const columnSelected = this.state.columnSelected;

    const selectRow = id => this.setState({rowSelected: id});
    const selectColumn = id => this.setState({columnSelected: id});
    const _GenericValue = (_values, idxStart) => GenericValues(fields, _values, selectRow, selectColumn, rowSelected, columnSelected, idxStart);
    
    return (
      <table className="Generic-table">
        <thead>
          <tr>
            {getViewFields(fields)}
          </tr>
        </thead>
        <tbody>
          {_GenericValue(values, 0)}
        </tbody>
        <tfoot>
          {_GenericValue([{}], values.length)}
        </tfoot>
      </table>
    );
  }
}

const GenericTableWrapper = ({fields, values}) => <GenericTable fields={fields} values={values} />;

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
