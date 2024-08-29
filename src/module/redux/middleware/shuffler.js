import { ActionTypes } from "../types";
import actionCreators from "../actionCreators.js";

import shuffle from "../../utils/shuffle.js";

let playlistUnshuffled = [];
const shuffler = (store) => (next) => (action) => {
  let state = store.getState();
  

  if (
    action.type === ActionTypes.SHUFFLE &&
    state.playlist.length > 1
  ) {
    const playlist = state.playlist;
    const currentIndex = state.currentTrack;
    const currentTrack = playlist[state.currentTrack]; // current track

    if(action.payload.shuffle){
      playlistUnshuffled = [...state.playlist]; // cache playlist
      
      let upper = playlist.slice(0, currentIndex);
      let lower = playlist.slice(currentIndex + 1, playlist.lenth);

      let withoutCurrent = upper.concat(lower);
      withoutCurrent = shuffle(withoutCurrent);

      // update playlist with current track on top
      store.dispatch(
        actionCreators.updatePlaylist([currentTrack, ...withoutCurrent])
      );
      store.dispatch(actionCreators.changeTrack(0));
      
    } else {
      const newIndex = playlistUnshuffled.findIndex((track, _, __) => track.ID === currentTrack.ID);
      store.dispatch(
        actionCreators.updatePlaylist([...playlistUnshuffled])
      );
      store.dispatch(actionCreators.changeTrack(newIndex));
    }
  }

  return next(action);
};

export default shuffler;
