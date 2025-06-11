import { configureStore, Tuple } from "@reduxjs/toolkit";
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

export default configureStore({
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
