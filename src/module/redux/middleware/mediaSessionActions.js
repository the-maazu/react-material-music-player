import actionCreator from "../actionCreators";

const mediaSessionActions = (store) => {
  navigator.mediaSession.setActionHandler("play", () =>
    store.dispatch(actionCreator.play())
  );

  navigator.mediaSession.setActionHandler("pause", () =>
    store.dispatch(actionCreator.pause())
  );

  navigator.mediaSession.setActionHandler("nexttrack", () =>
    store.dispatch(actionCreator.skipNext())
  );

  navigator.mediaSession.setActionHandler("previoustrack", () =>
    store.dispatch(actionCreator.skipPrev())
  );

  return (next) => (action) => next(action);
};

export default mediaSessionActions;
