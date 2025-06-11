import { Middleware } from "@reduxjs/toolkit";
import actionCreator from "../actionCreators";
import type { RootState } from "../store";

const mediaSessionActions: Middleware<{}, RootState> = (api) => {
  // check for MediaSession support
  if (navigator.mediaSession !== undefined) {
    navigator.mediaSession.setActionHandler("play", () =>
      api.dispatch(actionCreator.play())
    );

    navigator.mediaSession.setActionHandler("pause", () =>
      api.dispatch(actionCreator.pause())
    );

    navigator.mediaSession.setActionHandler("nexttrack", () =>
      api.dispatch(actionCreator.skipNext())
    );

    navigator.mediaSession.setActionHandler("previoustrack", () =>
      api.dispatch(actionCreator.skipPrev())
    );
  }

  return (next) => (action) => next(action);
};

export default mediaSessionActions;
