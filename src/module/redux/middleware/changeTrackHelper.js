import actionTypes from "../actionTypes.js";
import { RepeatModes } from "../StoreTypes.js";

const changeTrackHelper = (store) => {
  return (next) => (action) => {
    let state = store.getState();

    // chacke index out of bound
    if (
      action.type === actionTypes.CHANGE_TRACK &&
      (action.payload.index >= state.playlist.length ||
        action.payload.index < 0)
    ) {
      // set to 0 if repeat all
      if (state.repeatMode === RepeatModes.repeatAll) action.payload.index = 0;
      else return; // else stop the action
    }

    return next(action);
  };
};

export default changeTrackHelper;
