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

class Horses extends Component {
  constructor(props){
    super(props);
    this.state = {
      horsesFields: null,
      horsesValues: null
    };

    getHorses((f, v) => this.setState({horsesFields: f, horsesValues: v}));
    this.updateValue = this.updateValue.bind(this);
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

  render() {
    return (
        <main>
            {this.props.table({
                fields: this.state.horsesFields,
                values: this.state.horsesValues,
                updateValue: this.updateValue
            })}
        </main>
    );
  }
}

export default Horses;
