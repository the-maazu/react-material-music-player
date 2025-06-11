import { Middleware } from "@reduxjs/toolkit";
import ActionCreators from "../actionCreators";
import type { RootState } from "../store";
import { CustomNativeEventTypes } from "../types";

const eventHandler: Middleware<{}, RootState> = (api) => {
  let clearPlaylist = () => {
    api.dispatch(ActionCreators.stop());
    api.dispatch(ActionCreators.changeTrack(0));
    api.dispatch(ActionCreators.updatePlaylist([]));
  };

  window.addEventListener(CustomNativeEventTypes.PLAY, (e) => {
    let playlist = (e as CustomEvent).detail;

    if (!playlist) {
      api.dispatch(ActionCreators.play());
      return;
    } else if (playlist.length >= 1) {
      clearPlaylist();
      api.dispatch(ActionCreators.updatePlaylist(playlist));
      api.dispatch(ActionCreators.play());
    }
  });

  window.addEventListener(CustomNativeEventTypes.PAUSE, () => {
    api.dispatch(ActionCreators.pause());
  });

  window.addEventListener(CustomNativeEventTypes.STOP, () => {
    api.dispatch(ActionCreators.stop());
  });

  window.addEventListener(CustomNativeEventTypes.SET_VOLUME, (e) => {
    let level = (e as CustomEvent).detail; //typescript cast Event to CustomEvent
    if (level >= 0 || level <= 100)
      api.dispatch(ActionCreators.setVolume(level));
  });

  window.addEventListener(CustomNativeEventTypes.SKIP_NEXT, () => {
    api.dispatch(ActionCreators.skipNext());
  });

  window.addEventListener(CustomNativeEventTypes.SKIP_PREV, () => {
    api.dispatch(ActionCreators.skipPrev());
  });

  window.addEventListener(CustomNativeEventTypes.SHUFFLE, (e) => {
    let bool = (e as CustomEvent).detail; //typescript cast Event to CustomEvent
    api.dispatch(ActionCreators.shuffle(bool));
  });

  window.addEventListener(CustomNativeEventTypes.CHANGE_TRACK, (e) => {
    let index = (e as CustomEvent).detail;
    api.dispatch(ActionCreators.changeTrack(index));
  });

  window.addEventListener(CustomNativeEventTypes.SET_PLAYLIST, (e) => {
    let playlist = (e as CustomEvent).detail;
    if (playlist < 1) clearPlaylist();
    else api.dispatch(ActionCreators.updatePlaylist(playlist));
  });

  window.addEventListener(CustomNativeEventTypes.CLEAR_PLAYLIST, () => {
    clearPlaylist();
  });

  window.addEventListener(CustomNativeEventTypes.SEEK, (e) => {
    let progress = (e as CustomEvent).detail;
    if (progress > 100 || progress < 0) return;
    api.dispatch(ActionCreators.seek(progress));
  });

  window.addEventListener(CustomNativeEventTypes.SET_REPEAT_MODE, (e) => {
    api.dispatch(ActionCreators.setRepeatMode((e as CustomEvent).detail));
  });

  let playNextOrLaterHandler = (e: any) => {
    let currentPlaylist = api.getState().playlist;
    let currentTrack = api.getState().currentTrack;

    let newPlaylist = [];

    if (e.type === CustomNativeEventTypes.PLAY_NEXT)
      newPlaylist = currentPlaylist.reduce(
        (accumulator: any, currentValue: any, index: number) => {
          if (index === currentTrack)
            return [...accumulator, currentValue, ...e.detail];
          else return [...accumulator, currentValue];
        },
        []
      );
    else if (e.type === CustomNativeEventTypes.PLAY_LATER) {
      newPlaylist = currentPlaylist.concat(e.detail);
    }

    api.dispatch(ActionCreators.updatePlaylist(newPlaylist));
  };

  window.addEventListener(
    CustomNativeEventTypes.PLAY_NEXT,
    playNextOrLaterHandler
  );

  window.addEventListener(
    CustomNativeEventTypes.PLAY_LATER,
    playNextOrLaterHandler
  );

  return (next) => (action) => next(action);
};

export default eventHandler;
