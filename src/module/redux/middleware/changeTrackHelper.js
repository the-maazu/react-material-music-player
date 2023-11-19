import { RepeatMode, ActionTypes } from "../types.js";

const changeTrackHelper = (store) => {
  return (next) => (action) => {
    let state = store.getState();

    // chack index out of bound
    if (
      action.type === ActionTypes.CHANGE_TRACK &&
      (action.payload.index >= state.playlist.length ||
        action.payload.index < 0)
    ) {
      // set to 0 if repeat all
      if (state.repeatMode === RepeatMode.REPEAT_ALL) action.payload.index = 0;
      else return; // else stop the action
    }

    return next(action);
  };
};

export default changeTrackHelper;
