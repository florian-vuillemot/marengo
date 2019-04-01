import React, { Component } from 'react';
const axios = require('axios');

function getHorses(setHorses){
  axios.get('http://localhost:5000/horses')
  .then(data => {
    const horsesData = data.data;

    if (horsesData) {
      const horsesFields = horsesData.fields;
      const horsesValues = horsesData.data;
      setHorses(horsesFields, horsesValues)
    }
  })
  .catch(e => console.error(e));
}

function saveHorses(horses, updateHorses) {
  axios.post('http://localhost:5000/horses/update', horses).then(data => {
    updateHorses();
  });
}

class Horses extends Component {
  constructor(props){
    super(props);
    this.state = {
      horsesFields: null,
      horsesValues: null,
      horsesBackup: null
    };

    getHorses(this.updateHorses);
    this.updateHorses = this.updateHorses.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
    this.cancelValue = this.cancelValue.bind(this);
    this.removeValue = this.removeValue.bind(this);
  }

  updateHorses = (f, v) => this.setState({horsesFields: f, horsesValues: v, horsesBackup: v})

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
    this.setState({horsesValues: horses});
  }

  saveValue() {
    saveHorses(this.state.horsesValues, () => getHorses(this.updateHorses));
    this.props.cb();
  }

  cancelValue() {
    this.setState({horsesValues: this.state.horsesBackup});
    this.props.cb();
  }

  removeValue(id) {
    const horses = [...this.state.horsesValues];
    horses.splice(id, 1);
    this.setState({horsesValues: horses});
  }

  render() {
    return (
        <main>
            {this.props.table({
                fields: this.state.horsesFields,
                values: this.state.horsesValues,
                updateValue: this.updateValue,
                saveValue: this.saveValue,
                cancelValue: this.cancelValue,
                removeValue: this.removeValue
            })}
        </main>
    );
  }
}

export default Horses;
