import React, { Component } from 'react';
import './App.css';
import { GenericTable } from './lib/GenericTable';
import Auth from './lib/Auth';
import Horse from './lib/Horse';
import Movement from './lib/Movement';
import Healthcare from './lib/Healthcare';
import HealthStableInformation from './lib/HealthStableInformation';
import OwnerInformation from './lib/OwnerInformation';
import horsesPicture from './images/horses.jpg';
import horseTransportPicture from './images/transport.jpg';
import healthcarePicture from './images/healthcare.jpg';
import ownerInformationPicture from './images/owner_information.jpeg';
import healthStableInformationPicture from './images/health_stable_information.jpg';


const GenericTableWrapper = ({fields, values, updateValue, saveValue, cancelValue, addImages, removeValue}) =>
  <GenericTable
    fields={fields}
    values={values}
    updateValue={updateValue}
    saveValue={saveValue}
    cancelValue={cancelValue}
    addImages={addImages}
    removeValue={removeValue}
  />

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: null,
      httpClient: null
    };

    this.horseView = this.horseView.bind(this);
    this.selectRender = this.selectRender.bind(this);
  }

  showRender = () => this.setState({view: null});
  loadModule = module => this.setState({view: module});

  horseView = () => <Horse table={GenericTableWrapper} cb={this.showRender} loadModule={this.loadModule} httpClient={this.state.httpClient}/>;
  movementView = () => <Movement table={GenericTableWrapper} cb={this.showRender} loadModule={this.loadModule} httpClient={this.state.httpClient}/>;
  healthcareView = () => <Healthcare table={GenericTableWrapper} cb={this.showRender} loadModule={this.loadModule} httpClient={this.state.httpClient}/>;
  ownerInformationView = () => <OwnerInformation table={GenericTableWrapper} cb={this.showRender} loadModule={this.loadModule} httpClient={this.state.httpClient}/>;
  healthStableInformation = () => <HealthStableInformation table={GenericTableWrapper} cb={this.showRender} loadModule={this.loadModule} httpClient={this.state.httpClient}/>;

  selectRender() {
    return (
      <ul className="App-select">
        <li onClick={() => this.setState({view: this.horseView})}>
          <img className="Select-image" src={horsesPicture} alt="Accèder aux chevaux" />
        </li>
        <li onClick={() => this.setState({view: this.movementView})}>
          <img className="Select-image" src={horseTransportPicture} alt="Accèder aux mouvements des chevaux" />
        </li>
        <li onClick={() => this.setState({view: this.healthcareView})}>
          <img className="Select-image" src={healthcarePicture} alt="Accèder aux soins" />
        </li>
        <li onClick={() => this.setState({view: this.ownerInformationView})}>
          <img className="Select-image" src={ownerInformationPicture} alt="Accèder aux information de votre centre" />
        </li>
        <li onClick={() => this.setState({view: this.healthStableInformation})}>
          <img className="Select-image" src={healthStableInformationPicture} alt="Accèder aux information sanitaire de votre centre" />
        </li>
      </ul>
    );
  }

  render() {
    let toRend = null;
    if (this.state.httpClient === null) {
      toRend = <Auth setHttpClient={httpClient => this.setState({'httpClient': httpClient})}/>
    }
    else {
      toRend = !this.state.view ? this.selectRender() : this.state.view();
    }
    return (
      <div className="App">
        <div className="App-body">
          {toRend}
        </div>
      </div>
    );
  }
}

export default App;
