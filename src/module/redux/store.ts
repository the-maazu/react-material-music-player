import { configureStore, Tuple } from "@reduxjs/toolkit";
import ActionCreators from "./actionCreators";
import audioOutput from "./middleware/audioOutput";
import changeTrackHelper from "./middleware/changeTrackHelper";
import deleteHelper from "./middleware/deleteHelper";
import mediaSessionActions from "./middleware/mediaSessionActions";
import nativeEventHandler from "./middleware/nativeEventsHandler";
import shuffler from "./middleware/shuffler";
import skipHelper from "./middleware/skipHelper";
import updatePlaylistHelper from "./middleware/updatePlaylistHelper";
import reducer from "./reducers";
import reHydrateStore from "./reHydrateStore";

const store = configureStore({
  reducer,
  middleware: () =>
    new Tuple(
      nativeEventHandler,
      shuffler,
      updatePlaylistHelper,
      mediaSessionActions,
      changeTrackHelper,
      deleteHelper,
      audioOutput, // audio output might drop skip action
      skipHelper // skip helper must come after audioOutput
    ),
  preloadedState: reHydrateStore(),
});

export type AppAction =
  | ReturnType<typeof ActionCreators[keyof typeof ActionCreators]>
  | any;
export type RootState = ReturnType<typeof reducer>;
export default store;
