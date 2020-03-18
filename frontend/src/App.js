import React from 'react';
import Upload from './upload/Upload'
import Form from './form/Form2'

import ChartingSection from './components/ChartingSection';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Card">
        <Form />
        {/* <ChartingSection /> */}
      </div>
      <div ></div>
      <div className="Card">
        {/* <Upload /> */}
      </div>
    </div>
  );
}

export default App;
