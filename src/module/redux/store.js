import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'

import audioOutput from './middleware/audioOutput.js'
import shuffler from './middleware/shuffler.js'
import eventHandler from './middleware/events.js'
import changeTrackHelper from './middleware/changeTrackHelper'
import updatePlaylistHelper from './middleware/updatePlaylistHelper'
import mediaSessionActions from './middleware/mediaSessionActions'

export var MediaStates = {
  stopped: 'stopped',
  playing: 'playing',
  paused: 'paused'
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  rootReducer, 
  {
    mediaState: MediaStates.stopped,
    currentTrack: 0,
    shuffled: false,
    maximised: false,
    playlist: [],
    volume: 25
  }, 
  composeEnhancers(
    applyMiddleware(
      eventHandler, 
      shuffler, 
      updatePlaylistHelper,
      changeTrackHelper, 
      mediaSessionActions,
      audioOutput
    )
  )
)