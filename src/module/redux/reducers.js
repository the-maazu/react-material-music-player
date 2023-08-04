import { combineReducers } from "redux";

import { RepeatMode, MediaState } from "./types";
import { Track, ActionTypes } from "./types";

function mediaState(state = MediaState.STOPPED, action) {
  switch (action.type) {
    case ActionTypes.PLAY:
      return MediaState.PLAYING;
    case ActionTypes.PAUSE:
      return MediaState.PAUSED;
    case ActionTypes.STOP:
      return MediaState.STOPPED;
    default:
      return state;
  }
}

function playlist(state = [new Track("", "", "", "", "")], action) {
  if (action.type === ActionTypes.UPDATE_PLAYLIST)
    return action.payload.playlist;
  else return state;
}

function currentTrack(state = 0, action) {
  if (action.type === ActionTypes.CHANGE_TRACK) return action.payload.index;
  else return state;
}

function shuffled(state = false, action) {
  if (action.type === ActionTypes.SHUFFLE) return action.payload.shuffle;
  else return state;
}

function currentTime(state = 0, action) {
  if (action.type === ActionTypes.SET_CURRENT_TIME)
    return action.payload.currentTime;
  else return state;
}

function timeLeft(state = 0, action) {
  if (action.type === ActionTypes.SET_TIME_LEFT) return action.payload.timeLeft;
  else return state;
}

function volume(state = 0, action) {
  if (action.type === ActionTypes.CHANGE_VOLUME) return action.payload.volume;
  else return state;
}

function repeatMode(state = RepeatMode.NORMAL, action) {
  if (action.type === ActionTypes.SET_REPEAT_MODE) return action.payload.mode;
  else return state;
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
