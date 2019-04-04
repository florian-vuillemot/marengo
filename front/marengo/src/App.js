import React, {Component} from 'react';
import GenericTable from './lib/GenericTable';
import './App.css';
import Horse from './lib/Horse';
import Movement from './lib/Movement';
import Healthcare from './lib/Healthcare';
import OwnerInformation from './lib/OwnerInformation';
import horsesPicture from './images/horses.jpg';
import horseTransportPicture from './images/transport.jpg';
import healthcarePicture from './images/healthcare.jpg';
import ownerInformationPicture from './images/owner_information.jpeg';


const GenericTableWrapper = ({fields, values, updateValue, saveValue, cancelValue, removeValue}) =>
  <GenericTable
    fields={fields}
    values={values}
    updateValue={updateValue}
    saveValue={saveValue}
    cancelValue={cancelValue}
    removeValue={removeValue}
  />

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: null
    };

    this.horseView = this.horseView.bind(this);
    this.selectRender = this.selectRender.bind(this);
  }

  showRender = () => this.setState({view: null});

  horseView = () => <Horse table={GenericTableWrapper} cb={this.showRender}/>;
  movementView = () => <Movement table={GenericTableWrapper} cb={this.showRender}/>;
  healthcareView = () => <Healthcare table={GenericTableWrapper} cb={this.showRender}/>;
  ownerInformationView = () => <OwnerInformation table={GenericTableWrapper} cb={this.showRender}/>;

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
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
          {!this.state.view ? this.selectRender() : this.state.view()}
        </div>
      </div>
    );
  }
}

export default App;
