import React from 'react';
import logo from './logo.svg';
import './App.css';

// To use the player this is what you need to import
import Player, { TrackModel, PlayerInterface } from './module/index.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          react-material-music-player
        </p>
        <a
          className="App-link"
          href="https://github.com/the-maazu/react-material-music-player"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="App-link"
          href="https://www.npmjs.com/package/react-material-music-player"
          target="_blank"
          rel="noopener noreferrer"
        >
          npmjs
        </a>
      </header>

      {/* simply render player*/}
      <Player/>
      
    </div>
  );
}

// get media data over tthe internet
const TEST_MEDIA = "https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/sample_media/"

// update playlist with test data and start play
PlayerInterface.play( 
  [ new TrackModel(
    1, TEST_MEDIA +"bach.jpg","68 Choral", "Bach",
    TEST_MEDIA+"Bach%20--%20BWV%20245%20--%2068%20Choral.mp3")
  ] 
)

// wait 3 seconds then adds music at end of playlist
window.setTimeout(
  () => PlayerInterface.playLater(
    [ new TrackModel(
      2, TEST_MEDIA +"emerson.jpeg","All through the night", 
      "Emerson",TEST_MEDIA +"Emerson%20--%20All%20through%20the%20Night%20(Ar%20Hyd%20y%20Nos).mp3")
    ] 
  ), 
  3000 // 3 seconds
)

// wait 6 seconds then add music after current track
window.setTimeout(
  () => PlayerInterface.playNext(
    [ new TrackModel(
      3, TEST_MEDIA +"guido.jpg","Ut queant laxis", "Guido von Arezzo",
      TEST_MEDIA +"Guido%20von%20Arezzo%20--%20Ut%20queant%20laxis.mp3")
    ]
  ),
  6000// 6 seconds
)

export default App;
