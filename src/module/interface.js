import { CustomNativeEventTypes } from "./redux/types";

/**  @typedef {import("./redux/types").Track} Track */
/**
 * This sets new playlist and starts playing
 * @param {Track[]} playlist - Array of Tracks to play
 */
function play(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.PLAY, {
    detail: playlist,
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

const interfaceObject = {
  play: play,
  playNext: playNext,
  playLater: playLater,
};

export default interfaceObject;
