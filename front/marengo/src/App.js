import React from 'react';
import GenericTable from './lib/GenericTable';
import './App.css';
import Horses from './lib/Horses';


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
