import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import audioOutput from './middleware/audioOutput.js'
import shuffler from './middleware/shuffler.js'
import eventHandler from './middleware/events.js'
import changeTrackHelper from './middleware/changeTrackHelper'

export var MediaStates = {
  stopped: 'stopped',
  playing: 'playing',
  paused: 'paused'
}

export default createStore(rootReducer, {
    mediaState: MediaStates.stopped,
    currentTrack: 0,
    shuffled: false,
    maximised: false,
    playlist: [],
    volume: 25
}, applyMiddleware( audioOutput, changeTrackHelper, shuffler, eventHandler))