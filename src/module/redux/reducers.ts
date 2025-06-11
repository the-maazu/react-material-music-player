import { combineReducers } from "redux";
import { ActionTypes, TrackData, MediaState, RepeatMode } from "./types";

export default combineReducers({
  mediaState: (state = MediaState.STOPPED, action: any) => {
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
  },
  playlist: (state: TrackData[] = [], action: any): TrackData[] => {
    if (action.type === ActionTypes.UPDATE_PLAYLIST)
      return action.payload.playlist;
    else return state;
  },
  currentTrack: (state: number = 0, action: any): number => {
    if (action.type === ActionTypes.CHANGE_TRACK) return action.payload.index;
    else return state;
  },
  shuffled: (state: boolean = false, action: any): boolean => {
    if (action.type === ActionTypes.SHUFFLE) return action.payload.shuffle;
    else return state;
  },
  currentTime: (state = 0, action: any) => {
    if (action.type === ActionTypes.SET_CURRENT_TIME)
      return action.payload.currentTime;
    else return state;
  },
  timeLeft: (state = 0, action: any) => {
    if (action.type === ActionTypes.SET_TIME_LEFT)
      return action.payload.timeLeft;
    else return state;
  },
  volume: (state = 0, action: any) => {
    if (action.type === ActionTypes.CHANGE_VOLUME) return action.payload.volume;
    else return state;
  },
  repeatMode: (state = RepeatMode.NORMAL, action: any) => {
    if (action.type === ActionTypes.SET_REPEAT_MODE) return action.payload.mode;
    else return state;
  },
  duration: (state = 0, action: any) => {
    if (action.type === ActionTypes.SET_DURATION)
      return action.payload.duration;
    else return state;
  },
  deleteTrack: (state = 0, action: any) => {
    if (action.type === ActionTypes.DELETE_TRACK) return action.payload.index;
    else return state;
  },
  currentTrackId: (state: string = "", action: any): string => {
    if (action.type === ActionTypes.SET_CURRENT_TRACK_ID)
      return action.payload.id;
    else return state;
  },
});
