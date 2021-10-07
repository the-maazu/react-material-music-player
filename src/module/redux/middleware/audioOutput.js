import actionTypes from "../actionTypes.js";
import actionCreators from "../actionCreators.js";
import { MediaStates, RepeatModes } from "../types";

import AudioOutput from "../../model/AudioOutput.js";

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
    if (mediaState === MediaStates.playing)
      audio.play().catch(() => store.dispatch(actionCreators.stop()));
  });

  // set "on playback ended" listener
  audio.addEventListener("ended", () => {
    let state = store.getState();
    let currentTrack = state.currentTrack;
    let isLastTrack = currentTrack === state.playlist.length - 1;

    switch (state.repeatMode) {
      case RepeatModes.repeatAll:
        if (isLastTrack) store.dispatch(actionCreators.changeTrack(0));
        else store.dispatch(actionCreators.changeTrack(++currentTrack));
        break;
      case RepeatModes.repeatOne:
        audio.play(); // play again
        break;
      case RepeatModes.normal:
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
      case actionTypes.CHANGE_TRACK:
        let nexTrack = state.playlist[action.payload.index];
        audio.setSrc(nexTrack);
        break;

      case actionTypes.PLAY:
        audio.setSrc(state.playlist[state.currentTrack]);
        audio.play().catch(() => store.dispatch(actionCreators.stop()));
        break;

      case actionTypes.PAUSE:
        audio.pause();
        break;

      case actionTypes.STOP:
        audio.clear();
        break;

      case actionTypes.SEEK:
        audio.currentTime = action.payload.time;
        break;

      case actionTypes.CHANGE_VOLUME:
        audio.volume = action.payload.volume / 100;
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default audioOutput;
