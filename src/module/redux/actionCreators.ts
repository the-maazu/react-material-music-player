import { ActionTypes, TrackData } from "./types";

const ActionCreators = {
  changeTrack: (index: number) => ({
    type: ActionTypes.CHANGE_TRACK,
    payload: { index },
  }),

  deleteTrack: (index: number) => ({
    type: ActionTypes.DELETE_TRACK,
    payload: { index },
  }),

  play: () => ({
    type: ActionTypes.PLAY,
  }),

  pause: () => ({
    type: ActionTypes.PAUSE,
  }),

  stop: () => ({
    type: ActionTypes.STOP,
  }),

  updatePlaylist: (playlist: TrackData[]) => ({
    type: ActionTypes.UPDATE_PLAYLIST,
    payload: { playlist },
  }),

  shuffle: (bool: boolean) => ({
    type: ActionTypes.SHUFFLE,
    payload: { shuffle: bool },
  }),

  setCurrentTime: (currentTime: number) => ({
    type: ActionTypes.SET_CURRENT_TIME,
    payload: { currentTime },
  }),

  setTimeLeft: (timeLeft: number) => ({
    payload: { timeLeft },
    type: ActionTypes.SET_TIME_LEFT,
  }),

  seek: (progress: any) => ({
    type: ActionTypes.SEEK,
    payload: { progress },
  }),

  setVolume: (volume: number | number[]) => ({
    type: ActionTypes.CHANGE_VOLUME,
    payload: { volume },
  }),

  setRepeatMode: (mode: string) => ({
    type: ActionTypes.SET_REPEAT_MODE,
    payload: { mode },
  }),

  skipNext: () => ({
    type: ActionTypes.SKIP_NEXT,
  }),

  skipPrev: () => ({
    type: ActionTypes.SKIP_PREV,
  }),

  setDuration: (duration: number) => ({
    type: ActionTypes.SET_DURATION,
    payload: { duration },
  }),

  setCurrentTrackId: (id: string) => ({
    type: ActionTypes.SET_CURRENT_TRACK_ID,
    payload: { id },
  }),
};

export default ActionCreators;
