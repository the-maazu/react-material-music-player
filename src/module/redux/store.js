import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

import audioOutput from "./middleware/audioOutput.js";
import shuffler from "./middleware/shuffler.js";
import eventHandler from "./middleware/events.js";
import changeTrackHelper from "./middleware/changeTrackHelper";
import updatePlaylistHelper from "./middleware/updatePlaylistHelper";
import mediaSessionActions from "./middleware/mediaSessionActions";
import skipHelper from "./middleware/skipHelper";

import { MediaState, RepeatMode } from "./types";
import { Track } from "./types";

export default configureStore({
  reducer: rootReducer,
  middleware: [
    eventHandler,
    shuffler,
    updatePlaylistHelper,
    mediaSessionActions,
    changeTrackHelper,
    audioOutput, // audio output might drop skip action
    skipHelper, // skip helper must come after audioOutput
  ],
  preloadedState: {
    mediaState: MediaState.STOPPED,
    currentTrack: 0,
    shuffled: false,
    playlist: [new Track("", "", "", "", "")], // single default empty track
    volume: 25,
    repeatMode: RepeatMode.NORMAL,
  },
});
