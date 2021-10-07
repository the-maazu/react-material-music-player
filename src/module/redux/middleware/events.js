import Track from "../../model/TrackModel.js";
import actionCreators from "../actionCreators.js";
import { CustomNativeEventTypes } from "../StoreTypes";

export default function eventHandler(store) {
  window.addEventListener(CustomNativeEventTypes.PLAY, function (e) {
    let playlist = e.detail;

    if (playlist.length < 1) playlist.push(new Track("", "", "", "", ""));

    // eplicitly stop and insert new playlist
    store.dispatch(actionCreators.stop());
    store.dispatch(actionCreators.changeTrack(0));
    store.dispatch(actionCreators.updatePlaylist(playlist));
    store.dispatch(actionCreators.play());
  });

  let playNextAfterHandler = (e) => {
    let currentPlaylist = store.getState().playlist;
    let currentTrack = store.getState().currentTrack;

    let newPlaylist = [];

    if (e.type === CustomNativeEventTypes.PLAYNEXT)
      newPlaylist = currentPlaylist.reduce(
        (accumulator, currentValue, index) => {
          if (index === currentTrack)
            return [...accumulator, currentValue, ...e.detail];
          else return [...accumulator, currentValue];
        },
        []
      );
    else if (e.type === CustomNativeEventTypes.PLAYLATER) {
      newPlaylist = currentPlaylist.concat(e.detail);
    }

    store.dispatch(actionCreators.updatePlaylist(newPlaylist));
  };

  window.addEventListener(
    CustomNativeEventTypes.PLAYNEXT,
    playNextAfterHandler
  );

  window.addEventListener(
    CustomNativeEventTypes.PLAYLATER,
    playNextAfterHandler
  );

  return (next) => (action) => {
    return next(action);
  };
}
