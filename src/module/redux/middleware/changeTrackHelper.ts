import { Middleware } from "@reduxjs/toolkit";
import type { AppAction, RootState } from "../store";
import { ActionTypes, RepeatMode } from "../types";

const changeTrackHelper: Middleware<{}, RootState> =
  (api) => (next) => (action: AppAction) => {
    let state = api.getState();

    // check index out of bound
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

export default changeTrackHelper;
