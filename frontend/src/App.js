import React from 'react';

import Upload from './upload/Upload'

import FileUpload from './components/FileUpload';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Card">
        <Upload />
      </div>
      <div className="Card">
        <FileUpload />
      </div>
      {/* <Dropzone onFilesAdded={console.log} /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
