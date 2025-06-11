import { Middleware } from "@reduxjs/toolkit";
import ActionCreators from "../actionCreators";
import { ActionTypes } from "../types";

const skipHelper: Middleware = (api) => (next) => (action: any) => {
  let currentTrack = api.getState().currentTrack;

  if (action.type === ActionTypes.SKIP_NEXT)
    api.dispatch(ActionCreators.changeTrack(currentTrack + 1));
  else if (action.type === ActionTypes.SKIP_PREV)
    api.dispatch(ActionCreators.changeTrack(currentTrack - 1));

  return next(action);
};

export default skipHelper;
