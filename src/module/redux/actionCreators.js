import ActionTypes from "./actionTypes.js";

/**
 * Action object
 * @typedef {Object} ActionObject - Creates action object
 * @property {ActionTypes} type - Specifies the action type
 * @property {object} [payload] - Optional payload object
 */

const ActionCreators = {
  /**
   * Change track action creator
   * @param {number} index - Index to change to
   * @returns {ActionObject | {payload: {index: number}}} Action with index of type number payload
   */
  changeTrack: (index) => ({
    type: ActionTypes.CHANGE_TRACK,
    payload: {
      index: index,
    },
  }),

  /**
   * Play action creator
   * @returns {ActionObject} Play action object
   */
  play: () => ({
    type: ActionTypes.PLAY,
  }),

  /**
   * Pause action creator
   * @returns {ActionObject} Pause action object
   */
  pause: () => ({
    type: ActionTypes.PAUSE,
  }),

  /**
   * Stop action creator
   * @returns {ActionObject} Stop action object
   */
  stop: () => ({
    type: ActionTypes.STOP,
  }),

  /**
   * Update playlis action creator
   * @param {Array<import("./types.js").Track>} playlist - New playlist of tracks
   * @returns {ActionObject | {payload:{playlist: Array<import("./types.js").Track>}}} Action with playlist in payload
   */
  updatePlaylist: (playlist) => ({
    type: ActionTypes.UPDATE_PLAYLIST,
    payload: {
      playlist: playlist,
    },
  }),

  /**
   * Volume change action creator
   * @param {number} volume- Volume level any number between 0 - 100
   * @returns {ActionObject | {playload: {volume: number}}} Action with volume level payload
   */
  volumeChange: (volume) => ({
    type: ActionTypes.CHANGE_VOLUME,
    payload: {
      volume: volume,
    },
  }),

  /**
   * Shuffle action creator
   * @param {boolean} bool - Boolean to set shuffle
   * @returns {ActionObject | {payload:{shuffle: boolean}}} Action object with shuffle payload
   */
  shuffle: (bool) => ({
    type: ActionTypes.SHUFFLE,
    payload: { shuffle: bool },
  }),

  /**
   * Curent time action creator
   * @param {number} currentTime - Second indicating the current time
   * @returns {ActionObject | {payload:{currentTime: number}}} Action object with currentTime payload
   */
  setCurrentTime: (currentTime) => ({
    type: ActionTypes.SET_CURRENT_TIME,
    payload: {
      currentTime: currentTime,
    },
  }),

  /**
   * Time left action creator
   * @param {number} timeLeft - Seconds indicating time left
   * @returns {ActionObject | {payload:{timeLeft : number}}} Action object with timeLeft payload
   */
  setTimeLeft: (timeLeft) => ({
    type: ActionTypes.SET_TIME_LEFT,
    payload: {
      timeLeft: timeLeft,
    },
  }),

  /**
   * Seek action creator
   * @param {number} time - Time in seconds to seek to
   * @returns {ActionObject | {payload:{time: number}}} Action with time payload
   */
  seek: (time) => ({
    type: ActionTypes.SEEK,
    payload: {
      time: time,
    },
  }),

  /**
   * Change volume action creator
   * @param {number} value - Number 0 - 100 to set volume
   * @returns {ActionObject | {payload: {volume: number}}} Action with volume as payload
   */
  changeVolume: (volume) => ({
    type: ActionTypes.CHANGE_VOLUME,
    payload: {
      volume: volume,
    },
  }),

  /**
   * Repeat mode action creator
   * @returns {ActionObject} Action object
   */
  setRepeatMode: () => ({
    type: ActionTypes.SET_REPEAT_MODE,
  }),
};

export default ActionCreators;
