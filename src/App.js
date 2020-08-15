import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Provider} from 'react-redux'

import Player from './module/index.js'
import store from './module/redux/store.js'

function App() {
  return (
    <Provider store={store}>
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
