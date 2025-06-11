/**
 * Media states
 * @enum {string}
 */
const MediaState = {
  STOPPED: "STOPPED",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED"
};

/**
 * Repeat modes
 */
const RepeatMode = {
  NORMAL: "NORMAL",
  REPEAT_ALL: "REPEAT_ALL",
  REPEAT_ONE: "REPEAT_ONE"
};

/**
 * Custom native events for module level interface
 * @enum {string}
 */
const CustomNativeEventTypes = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  SET_VOLUME: "SET_VOLUME",
  SKIP_NEXT: "SKIP_NEXT",
  SKIP_PREV: "SKIP_PREV",
  SHUFFLE: "SHUFFLE",
  SEEK: "SEEK",
  SET_REPEAT_MODE: "SET_REPEAT_MODE",
  CHANGE_TRACK: "CHANGE_TRACK",
  PLAY_LATER: "PLAY_LATER",
  PLAY_NEXT: "PLAY_NEXT",
  SET_PLAYLIST: "SET_PLAYLIST",
  CLEAR_PLAYLIST: "CLEAR_PLAYLIST"
};

/**
 * Store action types
 * @enum {string}
 */
const ActionTypes = {
  CHANGE_TRACK: "CHANGE_TRACK",
  DELETE_TRACK: "DELETE_TRACK",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  SHUFFLE: "SHUFFLE",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  CHANGE_VOLUME: "CHANGE_VOLUME",
  SET_START_TIME: "SET_START_TIME",
  SET_STOP_TIME: "SET_STOP_TIME",
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_DURATION: "SET_DURATION",
  SET_TIME_LEFT: "SET_TIME_LEFT",
  SEEK: "SEEK",
  SET_REPEAT_MODE: "SET_REPEAT_MODE",
  SKIP_NEXT: "SKIP_NEXT",
  SKIP_PREV: "SKIP_PREV",
  SET_CURRENT_TRACK_ID: "SET_CURRENT_TRACK_ID"
};

interface ITrack {
  readonly ID: string;
  readonly coverArt?: string | undefined;
  readonly title: string;
  readonly artist?: string | undefined;
  readonly source: string;
  readonly duration: number;
}

export {
  ActionTypes,
  CustomNativeEventTypes,
  MediaState,
  RepeatMode,
  type ITrack
};
