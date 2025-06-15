import { Middleware } from "@reduxjs/toolkit";
import ActionCreators from "../actionCreators";
import type { AppAction, RootState } from "../store";
import { ActionTypes } from "../types";

const deleteHelper: Middleware<{}, RootState> =
  (api) => (next) => (action: AppAction) => {
    if (action.type !== ActionTypes.DELETE_TRACK) return next(action);

    const { playlist } = api.getState();
    const index = action.payload.index;
    playlist.splice(index, 1);

    api.dispatch(ActionCreators.updatePlaylist(playlist));

    return next(action);
  };

export default deleteHelper;
