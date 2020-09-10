import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Provider} from 'react-redux'

import Player, { TrackModel, PlayerInterface, PlayerStore } from './module/index.js'
import jpg from './test_media/220px-Frances_Densmore_recording_Mountain_Chief2.jpg'
import mp1 from './test_media/Kham_Hom_-_Sweet_Words.ogg'

// update playlist with test data after 3 seconds
window.setTimeout(
  () => PlayerInterface.play( 
    [ new TrackModel(1, jpg,"Sweet Words", "Kham Hom",mp1)] 
  ), 
  3000
)

function App() {
  return (
    <Provider store={PlayerStore}>
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
        <Player/>
      </header>
    </div>
    </Provider>
  );
}

export default App;
