import { CustomNativeEventTypes } from "./redux/StoreTypes";

function play(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.PLAY, {
    detail: playlist,
  });
  window.dispatchEvent(event);
}

function playNext(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.PLAYNEXT, {
    detail: playlist,
  });
  window.dispatchEvent(event);
}

function playLater(playlist) {
  const event = new CustomEvent(CustomNativeEventTypes.PLAYLATER, {
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
