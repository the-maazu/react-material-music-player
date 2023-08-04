import store from "./redux/store";
import { CustomNativeEventTypes } from "./redux/types";

/**  @typedef {import("./redux/types").Track} Track */
/**
 * This sets new playlist and starts playing
 * @param {?Track[]} playlist - Array of Tracks to play
 */
function play(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.PLAY, {
    detail: playlist,
  });
  window.dispatchEvent(event);
}

/**
 * This pauses the current track
 */
function pause() {
  const event = new CustomEvent(CustomNativeEventTypes.PAUSE);
  window.dispatchEvent(event);
}

/**
 * This stops the audio player element
 */
function stop() {
  const event = new CustomEvent(CustomNativeEventTypes.STOP);
  window.dispatchEvent(event);
}

/**
 * This changes volume level
 * @param {number} level - Number from 0 to 100
 */
function setVolume(level) {
  const event = new CustomEvent(CustomNativeEventTypes.SET_VOLUME, {
    detail: level,
  });
  window.dispatchEvent(event);
}

/**
 * This skips to next track in playlist
 */
function skipNext() {
  const event = new CustomEvent(CustomNativeEventTypes.SKIP_NEXT);
  window.dispatchEvent(event);
}

/**
 * This skips to previous track in playlist
 */
function skipPrev() {
  const event = new CustomEvent(CustomNativeEventTypes.SKIP_PREV);
  window.dispatchEvent(event);
}

/**
 * This shuffles playlist
 * @param {boolean} bool - true|false
 */
function shuffle(bool) {
  const event = new CustomEvent(CustomNativeEventTypes.SHUFFLE, {
    detail: bool,
  });
  window.dispatchEvent(event);
}

/**
 * This seeks through current track
 * @param {number} progress - Number 0 to 100 as percentage of total track time
 */
function seek(progress) {
  const event = new CustomEvent(CustomNativeEventTypes.SEEK, {
    detail: progress,
  });
  window.dispatchEvent(event);
}

/**  @typedef {import("./redux/types").RepeatMode} RepeatMode */
/**
 * This sets repeat mode
 * @param {RepeatMode} mode - One of three strings "NORMAL"|"REPEAT_ALL"|"REPEAT_ONE".
 */
function setRepeatMode(mode) {
  const event = new CustomEvent(CustomNativeEventTypes.SET_REPEAT_MODE, {
    detail: mode,
  });
  window.dispatchEvent(event);
}

/**
 * This changes track to specified index
 * @param {number} index - Index of track to jump to.
 */
function changeTrack(index) {
  const event = new CustomEvent(CustomNativeEventTypes.CHANGE_TRACK, {
    detail: index,
  });
  window.dispatchEvent(event);
}

/**
 * This inserts playlist right after current playing track
 * @param {Track[]} playlist - Array of Tracks to insert
 */
function playNext(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.PLAY_NEXT, {
    detail: playlist,
  });
  window.dispatchEvent(event);
}

/**
 * This appends playlist to the end of current playlist
 * @param {Track[]} playlist - Array of Tracks to append
 */
function playLater(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.PLAY_LATER, {
    detail: playlist,
  });
  window.dispatchEvent(event);
}

/**
 * This sets new playlist
 * @param {Track[]} playlist - Array of Tracks to set
 */
function setPlaylist(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.SET_PLAYLIST, {
    detail: playlist,
  });
  window.dispatchEvent(event);
}

/**
 * This clears all tracks
 */
function clearPlaylist() {
  const event = new CustomEvent(CustomNativeEventTypes.CLEAR_PLAYLIST);
  window.dispatchEvent(event);
}

/**
 * Returns the full state of player
 * @returns {import("./redux/types").State}
 */
function getState() {
  return store.getState();
}

/**
 * Listens for changes
 * @param {Function} func - function
 */
function subscribe(func) {
  store.subscribe(() => func(getState()));
}

const interfaceObject = {
  play: play,
  pause: pause,
  stop: stop,
  setVolume: setVolume,
  skipNext: skipNext,
  skipPrev: skipPrev,
  shuffle: shuffle,
  seek: seek,
  setRepeatMode: setRepeatMode,
  changeTrack: changeTrack,
  playNext: playNext,
  playLater: playLater,
  setPlaylist: setPlaylist,
  clearPlaylist: clearPlaylist,
  getState: getState,
  subscribe: subscribe,
};

export default interfaceObject;
