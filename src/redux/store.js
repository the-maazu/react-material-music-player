import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import audioOutput from './middleware/audioOutput.js'
import shuffler from './middleware/shuffler.js'

import TrackModel from '../components/Player/model/TrackModel.js'
import jpg from '../components/Player/jpg.jpg'
import mp3 from '../test_resources/1.mp3'

const trackArray = [];
for(var i=1; i<11; i++){
  trackArray.push( new TrackModel(i, jpg, 'let it rain', 'Mayonaise', mp3))
}

export default createStore(rootReducer, {
    mediaState: 'stopped',
    currentTrack: 0,
    shuffled: false,
    maximised: false,
    playlist: trackArray
}, applyMiddleware( audioOutput ))