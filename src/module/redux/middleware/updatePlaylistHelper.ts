import { Middleware } from "@reduxjs/toolkit";
import actionCreators from "../actionCreators";
import type { AppAction, RootState } from "../store";
import { ActionTypes } from "../types";

const updatePlaylistHelper: Middleware<{}, RootState> =
  (api) => (next) => (action: AppAction) => {
    if (action.type !== ActionTypes.UPDATE_PLAYLIST) return next(action);

    // store prev playlist and new playlist
    const { playlist, currentTrack } = api.getState();
    const newPlaylist = action.payload.playlist;

    // update state with new playlist
    const result = next(action);

    // check if playlist changed
    let playlistChanged = false;
    if (newPlaylist.length !== playlist.length) playlistChanged = true;
    else
      for (let i = 0; i < playlist.length; i++) {
        if (newPlaylist[i]?.id !== playlist[i]?.id) {
          playlistChanged = true;
          break;
        }
      }

    // if playlist changed look for current track
    if (playlistChanged) {
      let newCurrentTrack = -1;
      for (let i = 0; i < newPlaylist.length; i++) {
        if (newPlaylist[i]?.id === playlist[currentTrack]?.id) {
          newCurrentTrack = i;
          break;
        }
      }

      // if not found then its completely playlist, update current track to 0
      if (newCurrentTrack === -1) api.dispatch(actionCreators.changeTrack(0));
      else api.dispatch(actionCreators.changeTrack(newCurrentTrack)); // else update current track
    }

    return result;
  };

export default updatePlaylistHelper;
