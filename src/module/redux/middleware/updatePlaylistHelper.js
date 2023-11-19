import actionCreators from "../actionCreators.js";
import { ActionTypes } from "../types";

const updatePlaylistHelper = (store) => {
  return (next) => (action) => {
    if (action.type !== ActionTypes.UPDATE_PLAYLIST) return next(action);

    // store prev playlist and new playlist
    const { playlist, currentTrack } = store.getState();
    const newPlaylist = action.payload.playlist;

    // update state with new playlist
    const result = next(action);

    // check if playlist changed
    let playlistChanged = false;
    if (newPlaylist.length !== playlist.length) playlistChanged = true;
    else
      for (let i = 0; i < playlist.length; i++) {
        if (newPlaylist[i]?.ID !== playlist[i]?.ID) {
          playlistChanged = true;
          break;
        }
      }

    // if playlist changed look for current track
    if (playlistChanged) {
      let newCurrentTrack = -1;
      for (let i = 0; i < newPlaylist.length; i++) {
        if (newPlaylist[i]?.ID === playlist[currentTrack]?.ID) {
          newCurrentTrack = i;
          break;
        }
      }

      // if not found then its completely playlist, update current track to 0
      if (newCurrentTrack === -1) store.dispatch(actionCreators.changeTrack(0));
      else store.dispatch(actionCreators.changeTrack(newCurrentTrack)); // else update current track
    }

    return result;
  };
};

export default updatePlaylistHelper;
