import React from 'react';
import logo from './logo.svg';
import './App.css';

import Player from './components/Player/Player.js'
import TrackModel from './components/Player/model/TrackModel.js'

import jpg from './components/Player/jpg.jpg'

function App() {
  
  const trackArray = [];
  for(var i=1; i<11; i++){
    trackArray.push( new TrackModel(i, jpg, 'let it rain', 'Mayonaise'))
  }

  return (
    <div className="App">
      <header className="App-header">
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
        <Player 
        expanded={false}
        tracks={trackArray}
        />
      </header>
    </div>
  );
}

export default App;
