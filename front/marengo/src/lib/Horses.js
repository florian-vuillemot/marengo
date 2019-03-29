import React, { Component } from 'react';

function getHorses(setHorses){
  const axios = require('axios');
  axios.get('http://localhost:5000/horses').then(data => {
    const horsesData = data.data;

    if (horsesData) {
      const horsesFields = horsesData.fields;
      const horsesValues = horsesData.data;
      setHorses(horsesFields, horsesValues)
    }
  })
  .catch(e => console.error(e));
}

function saveHorses(horses) {
  console.log(horses);
}

class Horses extends Component {
  constructor(props){
    super(props);
    this.state = {
      horsesFields: null,
      horsesValues: null,
      horsesBackup: null
    };

    getHorses((f, v) => this.setState({horsesFields: f, horsesValues: v, horsesBackup: v}));
    this.updateValue = this.updateValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
    this.cancelValue = this.cancelValue.bind(this);
  }

  updateValue(idx, field, value) {
    let horses = null;
    const horsesValues = this.state.horsesValues;
    
    if (idx < horsesValues.length){
      const horseUpdate = {...horsesValues[idx], [field.key]: value};
      horses = horsesValues.map((h, _idx) => _idx === idx ? horseUpdate : h);
    }
    else {
      horses = [...this.state.horsesValues, {[field.key]: value}];
    }
    this.setState({
      horsesValues: horses
    });
  }

  saveValue() {
    saveHorses(this.state.horsesValues);
    this.setState({horsesBackup: this.state.horsesValues});
  }

  cancelValue() {
    this.setState({horsesValues: this.state.horsesBackup});
  }

  render() {
    return (
        <main>
            {this.props.table({
                fields: this.state.horsesFields,
                values: this.state.horsesValues,
                updateValue: this.updateValue,
                saveValue: this.saveValue,
                cancelValue: this.cancelValue
            })}
        </main>
    );
  }
}

export default Horses;
