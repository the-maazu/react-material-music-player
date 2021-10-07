/**
 * This contains all data needed for a song
 * @constructor
 * @param {!string} trackID
 * @param {!string} coverArt
 * @param {!string} title
 * @param {!string} artist
 * @param {!string} source
 */
export function TrackModel(trackID, coverArt, title, artist, source) {
  /**
   * Unique identifier used in sorting after shuffle
   * @readonly
   * */
  this.ID = trackID;
  /**
   * URL to cover art image
   * @readonly
   * */
  this.coverArt = coverArt;
  /**@readonly */
  this.title = title;
  /**@readonly */
  this.artist = artist;
  /**
   * URL to music file
   * @readonly
   * */
  this.source = source;

  this.getSource = function () {
    return source;
  };
}
/**@typedef {TrackModel} Track */

/**
 * @typedef {object} state - State object
 * @prop {MediaStates} mediaState - Media state
 * @prop {number} currentTrack - Current time in seconds
 * @prop {boolean} shuffled - Boolean representation of whether playlist is shuffled or not
 * @prop {Array<TrackModel>} playlist - Array of tracks supplied to player
 * @prop {number} currentTime - Current progress in seconds
 * @prop {number}  timeLeft - Time left to end play in seconds
 * @prop {number} volume - Volme level
 * @prop {RepeatModes} repeatMode - Repeat mode
 */

/**
 * Media states
 * @enum {string}
 */
export const MediaStates = {
  stopped: "stopped",
  playing: "playing",
  paused: "paused",
};

/**
 * Repeat modes
 * @enum {string}
 */
export const RepeatModes = {
  normal: "normal",
  repeatAll: "repeatAll",
  repeatOne: "repeatOne",
};

/**
 * Custom native events for interface
 * @enum {string}
 */
export const CustomNativeEventTypes = {
  PLAY: "PLAY",
  PLAYLATER: "PLAY LATER",
  PLAYNEXT: "PLAY NEXT",
};

/** Call back for useSelect hook
 * @callback useSelectCb
 * @param {state} state
 */

/**
 * Audio output model
 * @class
 * @extends {Audio}
 */
export default class AudioOutput extends Audio {
  constructor() {
    super();
    /**@private */
    this.track = new TrackModel("", "", "", "", ""); // default track
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
    }
  }

  /**
   * Unsets audio can be used to stop play
   */
  clear() {
    if (this.src === "") return;
    this.setSrc(new TrackModel("", "", "", "", ""));
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
