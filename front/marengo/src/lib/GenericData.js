import React, { Component } from 'react';
const axios = require('axios');

function getData(setData){
  axios.get('http://localhost:5000/horses')
  .then(data => {
    const _data = data.data;

    if (_data) {
      const fields = _data.fields;
      const values = _data.data;
      setData(fields, values)
    }
  })
  .catch(e => console.error(e));
}

function saveData(data) {
  axios.post('http://localhost:5000/horses/update', data);
}

class GenericData extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataFields: null,
      dataValues: null,
      dataBackup: null
    };

    getData(this.updateData);
    this.updateData = this.updateData.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
    this.cancelValue = this.cancelValue.bind(this);
    this.removeValue = this.removeValue.bind(this);
  }

  updateData = (f, v) => this.setState({dataFields: f, dataValues: v, dataBackup: v})

  updateValue(idx, field, value) {
    let data = null;
    const dataValues = this.state.dataValues;
    
    if (idx < dataValues.length){
      const dataUpdate = {...dataValues[idx], [field.key]: value};
      data = dataValues.map((h, _idx) => _idx === idx ? dataUpdate : h);
    }
    else {
      data = [...this.state.dataValues, {[field.key]: value}];
    }
    this.setState({dataValues: data});
  }

  saveValue() {
    saveData(this.state.dataValues);
    this.props.cb();
  }

  cancelValue() {
    this.setState({dataValues: this.state.dataBackup});
    this.props.cb();
  }

  removeValue(id) {
    const data = [...this.state.dataValues];
    data.splice(id, 1);
    this.setState({dataValues: data});
  }

  render() {
    return (
        <main>
            {this.props.table({
                fields: this.state.dataFields,
                values: this.state.dataValues,
                updateValue: this.updateValue,
                saveValue: this.saveValue,
                cancelValue: this.cancelValue,
                removeValue: this.removeValue
            })}
        </main>
    );
  }
}

export default GenericData;
