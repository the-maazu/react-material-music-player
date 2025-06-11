/**
 * Media states
 * @enum {string}
 */
enum MediaState {
  STOPPED = "STOPPED",
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
}

/**
 * Repeat modes
 */
enum RepeatMode {
  NORMAL = "NORMAL",
  REPEAT_ALL = "REPEAT_ALL",
  REPEAT_ONE = "REPEAT_ONE",
}

/**
 * Custom native events for module level interface
 * @enum {string}
 */
enum CustomNativeEventTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  STOP = "STOP",
  SET_VOLUME = "SET_VOLUME",
  SKIP_NEXT = "SKIP_NEXT",
  SKIP_PREV = "SKIP_PREV",
  SHUFFLE = "SHUFFLE",
  SEEK = "SEEK",
  SET_REPEAT_MODE = "SET_REPEAT_MODE",
  CHANGE_TRACK = "CHANGE_TRACK",
  PLAY_LATER = "PLAY_LATER",
  PLAY_NEXT = "PLAY_NEXT",
  SET_PLAYLIST = "SET_PLAYLIST",
  CLEAR_PLAYLIST = "CLEAR_PLAYLIST",
}

/**
 * Store action types
 * @enum {string}
 */
enum ActionTypes {
  CHANGE_TRACK = "CHANGE_TRACK",
  DELETE_TRACK = "DELETE_TRACK",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  STOP = "STOP",
  SHUFFLE = "SHUFFLE",
  UPDATE_PLAYLIST = "UPDATE_PLAYLIST",
  CHANGE_VOLUME = "CHANGE_VOLUME",
  SET_START_TIME = "SET_START_TIME",
  SET_STOP_TIME = "SET_STOP_TIME",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_DURATION = "SET_DURATION",
  SET_TIME_LEFT = "SET_TIME_LEFT",
  SEEK = "SEEK",
  SET_REPEAT_MODE = "SET_REPEAT_MODE",
  SKIP_NEXT = "SKIP_NEXT",
  SKIP_PREV = "SKIP_PREV",
  SET_CURRENT_TRACK_ID = "SET_CURRENT_TRACK_ID",
}

interface TrackData {
  id: string;
  coverArt: string;
  title: string;
  artist: string;
  source: string;
}

class Track {
  readonly id: string;
  readonly coverArt: string;
  readonly title: string;
  readonly artist: string;
  readonly source: string;

  constructor(data: TrackData) {
    this.id = data.id;
    this.coverArt = data.coverArt;
    this.title = data.title;
    this.artist = data.artist;
    this.source = data.source;
  }

  getSource(): string {
    return this.source;
  }
}

export { ActionTypes, CustomNativeEventTypes, MediaState, RepeatMode, Track };
export type { TrackData };
