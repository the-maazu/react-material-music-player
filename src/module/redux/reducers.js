import {combineReducers} from 'redux'

import actionTypes from './actionTypes.js'

function mediaState( state = 'stopped', action){

    switch(action.type){
        case actionTypes.PLAY:
            return 'playing'
        case actionTypes.PAUSE:
            return 'paused'
        case actionTypes.STOP:
            return 'stopped'
        default:
            return state
    }
}

function playlist(state = [], action){
    if(action.type === actionTypes.UPDATE_PLAYLIST)
    return action.payload.playlist;
    else
    return state
}

function currentTrack(state = 0, action){
    if(action.type === actionTypes.CHANGE_TRACK)
    return action.payload.index;
    else
    return state
}

function shuffled(state = false, action){
    if(action.type === actionTypes.SHUFFLE)
    return action.payload.shuffle
    else
    return state
}

function currentTime(state = 0, action){
    if(action.type === actionTypes.SET_CURRENT_TIME)
    return action.payload.currentTime;
    else
    return state
}

function timeLeft(state = 0, action){
    if(action.type === actionTypes.SET_TIME_LEFT)
    return action.payload.timeLeft
    else
    return state
}

function volume(state = 0, action){
    if(action.type === actionTypes.CHANGE_VOLUME)
    return action.payload.volume
    else
    return state
}

export default combineReducers( {mediaState, playlist, currentTrack, shuffled, currentTime, timeLeft, volume});