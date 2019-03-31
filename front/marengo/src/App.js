import React, { Component } from 'react';
import './App.css';
import Horses from './lib/Horses';

const TableCell = (className, value, cellLen, cb) => (
  <td colSpan={cellLen} className={className} onClick={cb}>
    {value}
  </td>
);

const GenericValue = (fields, data, selectColumn, columnSelected, rowIdx, updateValue, removeValue) => {
  const _td = (_key, _idx, cb, rd) => <td key={_key} onClick={() => cb(_idx)}>{rd}</td>;
  const view = fields.map((f, idx) => {
    const value = data[f.key] || null;
    const cb = (_idx) => selectColumn(_idx);
    const _onChange = e => updateValue(rowIdx, f, e.target.value);
    const _input = () => <input type={f.type} defaultValue={value} onChange={e => _onChange(e)} autoFocus/>;
    return _td(idx, idx, cb, columnSelected === idx ? _input() : value);
  });
  const removeRow = _td(view.length, rowIdx, removeValue, <i className='fas fa-trash-alt'></i>);
  return [...view, removeRow];
}

const GenericValues = (fields, values, selectRow, selectColumn, rowSelected, columnSelected, idxStart, updateValue, removeValue) =>
  values.map((value, idx) => {
    const _idx = idxStart + idx;
    const _tr = _td => <tr key={_idx} onClick={() => selectRow(_idx)} >{_td}</tr>;
    const _columnSelected = _idx === rowSelected ? columnSelected : null;
    return _tr(GenericValue(fields, value, selectColumn, _columnSelected, _idx, updateValue, removeValue));
  });

const getViewFields = (fields) => (fields && fields.map(field => <th key={field.name}>{field.name}</th>));

class GenericTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowSelected: null,
      columnSelected: null,
    };
    
    this.saveValue = this.saveValue.bind(this);
    this.cancelValue = this.cancelValue.bind(this);
  }

  saveValue() {
    this.setState({rowSelected: null, columnSelected: null});
    this.props.saveValue();
  }

  cancelValue() {
    this.setState({rowSelected: null, columnSelected: null});
    this.props.cancelValue();
  }

  render() {
    const fields = this.props.fields || [];
    const values = this.props.values || [];
    const updateValue = this.props.updateValue;
    const removeValue = this.props.removeValue;
    const rowSelected = this.state.rowSelected;
    const columnSelected = this.state.columnSelected;
    const nbColumn = fields.length + 1;

    const selectRow = id => this.setState({rowSelected: id});
    const selectColumn = id => this.setState({columnSelected: id});
    const _GenericValue = (_values, idxStart) => GenericValues(fields, _values, selectRow, selectColumn, rowSelected, columnSelected, idxStart, updateValue, removeValue);

    return (
      <table className="Generic-table">
        <thead>
          <tr>
            {getViewFields(fields)}
          </tr>
        </thead>
        <tbody>
          {_GenericValue(values, 0)}
          {_GenericValue([{}], values.length)}
        </tbody>
        <tfoot>
          <tr>
            {TableCell("Validate-button", "Sauvegarder", nbColumn, this.saveValue)}
          </tr>
          <tr>
            {TableCell("Cancel-button", "Annuler", nbColumn, this.cancelValue)}
          </tr>
        </tfoot>
      </table>
    );
  }
}

const GenericTableWrapper = ({fields, values, updateValue, saveValue, cancelValue, removeValue}) =>
  <GenericTable
    fields={fields}
    values={values}
    updateValue={updateValue}
    saveValue={saveValue}
    cancelValue={cancelValue}
    removeValue={removeValue}
  />

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
