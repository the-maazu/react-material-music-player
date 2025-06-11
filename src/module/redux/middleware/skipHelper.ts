import { Middleware } from "@reduxjs/toolkit";
import ActionCreators from "../actionCreators";
import { ActionTypes } from "../types";
import type { AppAction, RootState } from "../store";

const skipHelper: Middleware<{}, RootState> =
  (api) => (next) => (action: AppAction) => {
    // optionally narrow further here:
    if (action.type === ActionTypes.SKIP_NEXT) {
      const currentTrack = api.getState().currentTrack;
      api.dispatch(ActionCreators.changeTrack(currentTrack + 1));
    } else if (action.type === ActionTypes.SKIP_PREV) {
      const currentTrack = api.getState().currentTrack;
      api.dispatch(ActionCreators.changeTrack(currentTrack - 1));
    }

    return next(action);
  };

export default skipHelper;
