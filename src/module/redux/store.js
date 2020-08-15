import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import audioOutput from './middleware/audioOutput.js'
import shuffler from './middleware/shuffler.js'

import TrackModel from '../model/TrackModel.js'

import jpg from '../../test_media/220px-Frances_Densmore_recording_Mountain_Chief2.jpg'
import mp1 from '../../test_media/Kham_Hom_-_Sweet_Words.ogg'

// import mp2 from '../test_resources/2.mp3'
// import mp3 from '../test_resources/3.mp3'

// const trackArray = [];

// trackArray.push( new TrackModel(1, jpg, '1', 'Mayonaise', mp1))
// trackArray.push( new TrackModel(2, jpg, '2', 'Mayonaise', mp2))
// trackArray.push( new TrackModel(3, jpg, '3', 'Mayonaise', mp3))

export default createStore(rootReducer, {
    mediaState: 'stopped',
    currentTrack: 0,
    shuffled: false,
    maximised: false,
    playlist: [ new TrackModel(1, jpg,"Sweet Words", "Kham Hom",mp1)],
    volume: 25
}, applyMiddleware( audioOutput, shuffler ))

export var MediaStates = {
  stopped: 'stopped',
  playing: 'playing',
  paused: 'paused'
}