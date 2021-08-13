import React from 'react';
import logo from './logo.svg';
import './App.css';

// To use the player this is what you need to import
import Player, { TrackModel, PlayerInterface } from './module/index.js'

// Test music and cover art file
import jpg from './test_media/220px-Frances_Densmore_recording_Mountain_Chief2.jpg'
import mp1 from './test_media/Kham_Hom_-_Sweet_Words.ogg'
import jpg1 from './test_media/220px-Emile_Berliner_with_phonograph.jpg'
import mp2 from './test_media/1860-Scott-Au-Clair-de-la-Lune-05-09.ogg'

// update playlist with test data after 3 seconds
window.setTimeout(
  () => PlayerInterface.play( 
    [ new TrackModel(1, jpg,"Sweet Words", "Kham Hom",mp1)] 
  ), 
  3000 // 3 seconds
)

window.setTimeout(
  () => PlayerInterface.playLater( 
    [ new TrackModel(3, jpg,"Sweet Words", "Kham Hom",mp1)] 
  ), 
  3000 // 3 seconds
)

window.setTimeout(
  () => PlayerInterface.playNext(
    [ new TrackModel(2, jpg1,"Free me", "Kham Ham",mp2)] 
  ),
  6000// 3 seconds
)

function App() {
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

        {/* simply render player*/}
        <Player/>
        
      </header>
    </div>
  );
}

export default App;
