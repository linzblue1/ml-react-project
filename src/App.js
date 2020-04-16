import React from 'react';
import '../src/styles/App.css';
import Webcam from './components/Webcam'

function App() {
  return (
    <div className="App">
      <div className="header"></div>
      <div className="container"><Webcam /></div>
    </div>
  );
}

export default App;
