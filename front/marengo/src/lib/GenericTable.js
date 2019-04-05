import React, { Component } from 'react';

const GenericInput = (data, field, rowIdx, updateValue) => {
  const value = data[field.key] || "";
  const _onChange = e => updateValue(rowIdx, field, e.target.value);
  if (field.type === 'select') {
    return (
      <select onChange={e => _onChange(e)} value={value}>
        {field.values.map(d => <option defaultValue={d} key={d}>{d}</option>)}
      </select>
    );
  }
  return <input type={field.type} defaultValue={value} onChange={e => _onChange(e)} autoFocus/>;
}

const TableCell = (className, value, cellLen, cb) => (
    <td colSpan={cellLen} className={className} onClick={cb}>
      {value}
    </td>
);
  
const GenericValue = (fields, data, selectColumn, columnSelected, rowIdx, updateValue, addImages, removeValue) => {
    const _td = (_key, _idx, cb, rd) => <td key={_key} onClick={() => cb(_idx)}>{rd}</td>;
    const view = fields.map((f, idx) => {
      const value = data[f.key] || null;
      const cb = (_idx) => selectColumn(_idx);
      const _input = () => GenericInput(data, f, rowIdx, updateValue);
      return _td(idx, idx, cb, columnSelected === idx ? _input() : value);
    });
    const imagesIcon = _td(view.length, rowIdx, addImages, <i className='fas fa-images'></i>);
    const removeRow = _td(view.length + 1, rowIdx, removeValue, <i className='fas fa-trash-alt'></i>);
    return [...view, imagesIcon, removeRow];
}
  
const GenericValues = (fields, values, selectRow, selectColumn, rowSelected, columnSelected, idxStart, updateValue, addImages, removeValue) =>
    values.map((value, idx) => {
      const _idx = idxStart + idx;
      const _tr = _td => <tr key={_idx} onClick={() => selectRow(_idx)} >{_td}</tr>;
      const _columnSelected = _idx === rowSelected ? columnSelected : null;
      return _tr(GenericValue(fields, value, selectColumn, _columnSelected, _idx, updateValue, addImages, removeValue));
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
      const addImages = this.props.addImages;
      const removeValue = this.props.removeValue;
      const rowSelected = this.state.rowSelected;
      const columnSelected = this.state.columnSelected;
      const nbColumn = fields.length + 1;
  
      const selectRow = id => this.setState({rowSelected: id});
      const selectColumn = id => this.setState({columnSelected: id});
      const _GenericValue = (_values, idxStart) => GenericValues(fields, _values, selectRow, selectColumn, rowSelected, columnSelected, idxStart, updateValue, addImages, removeValue);
      return (
        <table className="Generic-table">
          <thead>
            <tr>
              {getViewFields(fields)}
            </tr>
          </thead>
          <tbody>
            {_GenericValue(values, 0)}
            {_GenericValue([{}, {}], values.length)}
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

export default GenericTable;