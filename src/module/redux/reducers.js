import { combineReducers } from "redux";

import actionTypes from "./actionTypes.js";

import { RepeatModes, MediaStates } from "./StoreTypes";
import TrackModel from "../model/TrackModel";

function mediaState(state = MediaStates.stopped, action) {
  switch (action.type) {
    case actionTypes.PLAY:
      return MediaStates.playing;
    case actionTypes.PAUSE:
      return MediaStates.paused;
    case actionTypes.STOP:
      return MediaStates.stopped;
    default:
      return state;
  }
}

function playlist(state = [new TrackModel("", "", "", "", "")], action) {
  if (action.type === actionTypes.UPDATE_PLAYLIST)
    return action.payload.playlist;
  else return state;
}

function currentTrack(state = 0, action) {
  if (action.type === actionTypes.CHANGE_TRACK) return action.payload.index;
  else return state;
}

function shuffled(state = false, action) {
  if (action.type === actionTypes.SHUFFLE) return action.payload.shuffle;
  else return state;
}

function currentTime(state = 0, action) {
  if (action.type === actionTypes.SET_CURRENT_TIME)
    return action.payload.currentTime;
  else return state;
}

function timeLeft(state = 0, action) {
  if (action.type === actionTypes.SET_TIME_LEFT) return action.payload.timeLeft;
  else return state;
}

function volume(state = 0, action) {
  if (action.type === actionTypes.CHANGE_VOLUME) return action.payload.volume;
  else return state;
}

function repeatMode(state = RepeatModes.normal, action) {
  if (action.type !== actionTypes.SET_REPEAT_MODE) return state;
  switch (state) {
    case RepeatModes.normal:
      return RepeatModes.repeatAll;
    case RepeatModes.repeatAll:
      return RepeatModes.repeatOne;
    case RepeatModes.repeatOne:
      return RepeatModes.normal;
    default:
      return state;
  }
}

export default combineReducers({
  mediaState,
  playlist,
  currentTrack,
  shuffled,
  currentTime,
  timeLeft,
  volume,
  repeatMode,
});
