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
      <div ></div>
      {/* <div className="Card">
        <FileUpload />
      </div> */}
    </div>
  );
}

export default App;
