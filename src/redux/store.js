import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import audioOutput from './middleware/audioOutput.js'
import shuffler from './middleware/shuffler.js'

import TrackModel from '../components/Player/model/TrackModel.js'
import jpg from '../components/Player/jpg.jpg'

import mp1 from '../test_resources/1.mp3'
import mp2 from '../test_resources/2.mp3'
import mp3 from '../test_resources/3.mp3'

const trackArray = [];

trackArray.push( new TrackModel(1, jpg, '1', 'Mayonaise', mp1))
trackArray.push( new TrackModel(2, jpg, '2', 'Mayonaise', mp2))
trackArray.push( new TrackModel(3, jpg, '3', 'Mayonaise', mp3))

export default createStore(rootReducer, {
    mediaState: 'stopped',
    currentTrack: 0,
    shuffled: false,
    maximised: false,
    playlist: trackArray,
    volume: 25
}, applyMiddleware( audioOutput, shuffler ))

export var MediaStates = {
  stopped: 'stopped',
  playing: 'playing',
  paused: 'paused'
}