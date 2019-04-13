import React, { Component } from 'react';
import Images from './Images';

function getData(setData, route, httpClient){
  httpClient.get(route)
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

function saveData(data, route, httpClient) {
  httpClient.post(`${route}/update`, data);
}

function getImgName() {
  const time = new Date().getTime();
  return [time, time + 1, time + 2, time + 3];
}

class GenericData extends Component {
  constructor(route, props){
    super(props);

    this.httpClient = props.httpClient;
    this.route = route;

    this.state = {
      dataFields: null,
      dataValues: null,
      dataBackup: null
    };

    getData(this.updateData, this.route, this.httpClient);
    this.updateData = this.updateData.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
    this.cancelValue = this.cancelValue.bind(this);
    this.addImages = this.addImages.bind(this);
    this.removeValue = this.removeValue.bind(this);
  }

  updateData = (f, v) => this.setState({dataFields: f, dataValues: v, dataBackup: v})

  updateValue(idx, field, value) {
    let data = null;
    const dataValues = this.state.dataValues;
    
    if (idx < dataValues.length){
      const imagesName = dataValues[idx].images ? dataValues[idx].images : getImgName();
      const dataUpdate = {...dataValues[idx], [field.key]: value, images: imagesName};
      data = dataValues.map((h, _idx) => _idx === idx ? dataUpdate : h);
    }
    else {
      const imagesNames = getImgName();
      data = [...this.state.dataValues, {[field.key]: value, images: imagesNames}];
    }
    this.setState({dataValues: data});
  }

  saveValue() {
    saveData(this.state.dataValues, this.route, this.httpClient);
    this.props.cb();
  }

  cancelValue() {
    this.setState({dataValues: this.state.dataBackup});
    this.props.cb();
  }

  addImages(idx) {
    const images = this.state.dataValues[idx].images;
    this.props.loadModule(() =>
      <Images images={images} cb={() => this.saveValue()} httpClient={this.httpClient}/>);
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
                addImages: this.addImages,
                removeValue: this.removeValue
            })}
        </main>
    );
  }
}

export default GenericData;
