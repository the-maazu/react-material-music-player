import actionCreators from "../actionCreators.js";
import { MediaState, RepeatMode } from "../types";

import { AudioOutput, ActionTypes } from "../types";

const audio = new AudioOutput();

const audioOutput = (store) => {
  audio.addEventListener("timeupdate", () => {
    //set current time
    store.dispatch(
      actionCreators.setCurrentTime(Math.floor(audio.currentTime))
    );

    // set time left
    store.dispatch(
      actionCreators.setTimeLeft(
        Math.floor(
          isNaN(audio.duration) ? 0 : audio.duration - audio.currentTime
        )
      )
    );
  });

  // set error listener
  audio.addEventListener("error", () => {
    store.dispatch(actionCreators.stop());
  });

  // set canplay listener
  audio.addEventListener("canplay", () => {
    let mediaState = store.getState().mediaState;
    if (mediaState === MediaState.PLAYING)
      audio.play().catch(() => store.dispatch(actionCreators.stop()));
  });

  // set "on playback ended" listener
  audio.addEventListener("ended", () => {
    let state = store.getState();
    let currentTrack = state.currentTrack;
    let isLastTrack = currentTrack === state.playlist.length - 1;

    switch (state.repeatMode) {
      case RepeatMode.REPEAT_ALL:
        if (isLastTrack) store.dispatch(actionCreators.changeTrack(0));
        else store.dispatch(actionCreators.changeTrack(++currentTrack));
        break;
      case RepeatMode.REPEAT_ONE:
        audio.play(); // play again
        break;
      case RepeatMode.NORMAL:
      default:
        if (isLastTrack) store.dispatch(actionCreators.stop());
        else store.dispatch(actionCreators.changeTrack(++currentTrack));
    }
  });

  // set default volume level
  audio.volume = store.getState().volume / 100;

  return (next) => (action) => {
    let state = store.getState();

    switch (action.type) {
      case ActionTypes.CHANGE_TRACK:
        let nexTrack = state.playlist[action.payload.index];
        audio.setSrc(nexTrack);
        if (state.mediaState === MediaState.PLAYING)
          audio.play().catch(() => store.dispatch(actionCreators.stop()));
        break;

      case ActionTypes.PLAY:
        audio.setSrc(state.playlist[state.currentTrack]);
        audio.play().catch(() => store.dispatch(actionCreators.stop()));
        break;

      case ActionTypes.PAUSE:
        audio.pause();
        break;

      case ActionTypes.STOP:
        audio.clear();
        break;

      case ActionTypes.SEEK:
        if (!isNaN(audio.duration) && isFinite(audio.duration))
          audio.currentTime = (action.payload.progress / 100) * audio.duration;
        break;

      case ActionTypes.CHANGE_VOLUME:
        audio.volume = action.payload.volume / 100;
        break;

      case ActionTypes.SKIP_PREV:
        if (audio.currentTime > 3) {
          store.dispatch(actionCreators.seek(0));
          return; // drop the action
        }
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default audioOutput;
