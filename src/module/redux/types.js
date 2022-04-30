/**
 * This contains all data needed for a song
 * @constructor
 * @param {!string} trackID - Unique identifier used in sorting after shuffle
 * @param {!string} coverArt -  URL to cover art image
 * @param {!string} title
 * @param {!string} artist
 * @param {!string} source - URL to music file
 */
function Track(trackID, coverArt, title, artist, source) {
  /** @readonly*/
  this.ID = trackID;
  /** @readonly*/
  this.coverArt = coverArt;
  /**@readonly */
  this.title = title;
  /**@readonly */
  this.artist = artist;
  /** @readonly*/
  this.source = source;

  this.getSource = function () {
    return source;
  };
}

/**
 * @typedef {object} State - State object
 * @prop {MediaState} mediaState - Media state
 * @prop {number} currentTrack - Current time in seconds
 * @prop {boolean} shuffled - Boolean representation of whether playlist is shuffled or not
 * @prop {Array<Track>} playlist - Array of tracks supplied to player
 * @prop {number} currentTime - Current progress in seconds
 * @prop {number}  timeLeft - Time left to end play in seconds
 * @prop {number} volume - Volme level
 * @prop {RepeatMode} repeatMode - Repeat mode
 */

/**
 * Media states
 * @enum {string}
 */
const MediaState = {
  STOPPED: "STOPPED",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
};

/**
 * Repeat modes
 * @enum {string}
 */
const RepeatMode = {
  NORMAL: "NORMAL",
  REPEAT_ALL: "REPEAT_ALL",
  REPEAT_ONE: "REPEAT_ONE",
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
  CLEAR_PLAYLIST: "CLEAR_PLAYLIST",
};

/** Call back for useSelect hook
 * @callback useSelectCb
 * @param {State} state
 */

/**
 * Audio output model
 * @class
 * @extends {Audio}
 */
class AudioOutput extends Audio {
  constructor() {
    super();
    /**@private */
    this.track = new Track("", "", "", "", ""); // default track
  }

  /**
   * Sets source of audio
   * @param {Track} track
   */
  setSrc(track) {
    if (track === undefined) return;
    if (!this.isCurrent(track)) {
      this.src = track.source;
      this.track = track;
      this.setMediaMetadata(track);
    }
  }

  setMediaMetadata(track) {
    if ("mediaSession" in navigator) {
      if (!track) navigator.mediaSession.metadata = null;
      else
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: track.title,
          artist: track.artist,
          album: "",
          artwork: [{ src: track.coverArt }],
        });
    }
  }

  /**
   * Unsets audio can be used to stop play
   */
  clear() {
    if (this.src === "") return;
    this.setSrc(new Track("", "", "", "", ""));
    this.setMediaMetadata(null);
  }

  /**
   * Check if same track loaded
   * @param {Track} track
   * @returns {boolean}
   */
  isCurrent(track) {
    return this.track.ID === track.ID;
  }
}

/**
 * Store action types
 * @enum {string}
 */
const ActionTypes = {
  CHANGE_TRACK: "CHANGE_TRACK",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  SHUFFLE: "SHUFFLE",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  CHANGE_VOLUME: "CHANGE_VOLUME",
  SET_START_TIME: "SET_START_TIME",
  SET_STOP_TIME: "SET_STOP_TIME",
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_TIME_LEFT: "SET_TIME_LEFT",
  SEEK: "SEEK",
  SET_REPEAT_MODE: "SET_REPEAT_MODE",
  SKIP_NEXT: "SKIP_NEXT",
  SKIP_PREV: "SKIP_PREV",
};

export {
  ActionTypes,
  AudioOutput,
  CustomNativeEventTypes,
  MediaState,
  RepeatMode,
  Track,
};
