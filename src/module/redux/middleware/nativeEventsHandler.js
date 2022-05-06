import { Track } from "../types";
import actionCreators from "../actionCreators.js";
import { CustomNativeEventTypes } from "../types";

export default function eventHandler(store) {
  window.addEventListener(CustomNativeEventTypes.PLAY, function (e) {
    let playlist = /**@type {CustomEvent}*/ (e).detail;

    if (!playlist) store.dispatch(actionCreators.play());
    else if (playlist.length < 1) playlist.push(new Track("", "", "", "", ""));

    // eplicitly stop and insert new playlist
    store.dispatch(actionCreators.stop());
    store.dispatch(actionCreators.changeTrack(0));
    store.dispatch(actionCreators.updatePlaylist(playlist));
    store.dispatch(actionCreators.play());
  });

  window.addEventListener(CustomNativeEventTypes.PAUSE, function (e) {
    store.dispatch(actionCreators.pause());
  });

  window.addEventListener(CustomNativeEventTypes.STOP, function (e) {
    store.dispatch(actionCreators.stop());
  });

  window.addEventListener(CustomNativeEventTypes.SET_VOLUME, function (e) {
    let level = /** @type {CustomEvent} */ (e).detail; //typescript cast Event to CustomEvent
    if (level >= 0 || level <= 100)
      store.dispatch(actionCreators.setVolume(level));
  });

  window.addEventListener(CustomNativeEventTypes.SKIP_NEXT, function (e) {
    store.dispatch(actionCreators.skipNext());
  });

  window.addEventListener(CustomNativeEventTypes.SKIP_PREV, function (e) {
    store.dispatch(actionCreators.skipPrev());
  });

  window.addEventListener(CustomNativeEventTypes.SHUFFLE, function (e) {
    let bool = /** @type {CustomEvent} */ (e).detail; //typescript cast Event to CustomEvent
    store.dispatch(actionCreators.shuffle(bool));
  });

  let playNextOrLaterHandler = (e) => {
    let currentPlaylist = store.getState().playlist;
    let currentTrack = store.getState().currentTrack;

    let newPlaylist = [];

    if (e.type === CustomNativeEventTypes.PLAY_NEXT)
      newPlaylist = currentPlaylist.reduce(
        (accumulator, currentValue, index) => {
          if (index === currentTrack)
            return [...accumulator, currentValue, ...e.detail];
          else return [...accumulator, currentValue];
        },
        []
      );
    else if (e.type === CustomNativeEventTypes.PLAY_LATER) {
      newPlaylist = currentPlaylist.concat(e.detail);
    }

    store.dispatch(actionCreators.updatePlaylist(newPlaylist));
  };

  window.addEventListener(
    CustomNativeEventTypes.PLAY_NEXT,
    playNextOrLaterHandler
  );

  window.addEventListener(
    CustomNativeEventTypes.PLAY_LATER,
    playNextOrLaterHandler
  );

  return (next) => (action) => {
    return next(action);
  };
}
