import { ActionTypes } from "./types";

const ActionCreators = {
  changeTrack: (index) => ({
    type: ActionTypes.CHANGE_TRACK,
    payload: {
      index: index,
    },
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

  updatePlaylist: (playlist) => ({
    type: ActionTypes.UPDATE_PLAYLIST,
    payload: {
      playlist: playlist,
    },
  }),

  volumeChange: (volume) => ({
    type: ActionTypes.CHANGE_VOLUME,
    payload: {
      volume: volume,
    },
  }),

  shuffle: (bool) => ({
    type: ActionTypes.SHUFFLE,
    payload: { shuffle: bool },
  }),

  setCurrentTime: (currentTime) => ({
    type: ActionTypes.SET_CURRENT_TIME,
    payload: {
      currentTime: currentTime,
    },
  }),

  setTimeLeft: (timeLeft) => ({
    type: ActionTypes.SET_TIME_LEFT,
    payload: {
      timeLeft: timeLeft,
    },
  }),

  seek: (time) => ({
    type: ActionTypes.SEEK,
    payload: {
      time: time,
    },
  }),

  changeVolume: (volume) => ({
    type: ActionTypes.CHANGE_VOLUME,
    payload: {
      volume: volume,
    },
  }),

  setRepeatMode: () => ({
    type: ActionTypes.SET_REPEAT_MODE,
  }),

  skipNext: () => ({
    type: ActionTypes.SKIP_NEXT,
  }),

  skipPrev: () => ({
    type: ActionTypes.SKIP_PREV,
  }),
};

export default ActionCreators;
