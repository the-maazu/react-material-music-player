import ActionCreators from "../actionCreators.js";
import { ActionTypes } from "../types.js";

const skipHelper = (store) => {
  return (next) => (action) => {
    let currentTrack = store.getState().currentTrack;

    if (action.type === ActionTypes.SKIP_NEXT)
      store.dispatch(ActionCreators.changeTrack(currentTrack + 1));
    else if (action.type === ActionTypes.SKIP_PREV)
      store.dispatch(ActionCreators.changeTrack(currentTrack - 1));

    return next(action);
  };
};

export default skipHelper;
