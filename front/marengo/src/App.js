import React, {Component} from 'react';
import GenericTable from './lib/GenericTable';
import './App.css';
import Horses from './lib/Horses';
import horsesPicture from './images/horses.jpg';
import horseTransport from './images/transport.jpg';


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

    this.horsesView = this.horsesView.bind(this);
    this.selectRender = this.selectRender.bind(this);
  }

  showRender = () => this.setState({view: null});

  horsesView = () => <Horses table={GenericTableWrapper} cb={this.showRender}/>;

  selectRender() {
    return (
      <ul className="App-select">
        <li onClick={() => this.setState({view: this.horsesView})}>
          <img className="Select-image" src={horsesPicture} alt="Accèder au chevaux" />
        </li>
        <li>
          <img className="Select-image" src={horseTransport} alt="Accèder au mouvement des chevaux" />
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
