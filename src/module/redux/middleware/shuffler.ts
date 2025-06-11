import { Middleware } from "@reduxjs/toolkit";
import shuffle from "../../utils/shuffle";
import actionCreators from "../actionCreators";
import { ActionTypes, ITrack } from "../types";

const shuffler: Middleware = (api) => (next) => (action: any) => {
  let state = api.getState();

  if (
    action.type === ActionTypes.SHUFFLE &&
    state.shuffled !== action.payload.shuffle &&
    state.playlist.lenth > 1
  ) {
    let playlist = state.playlist;
    let currentIndex = state.currentTrack;
    let currentTrack = playlist[state.currentTrack]; // current track
    let upper = playlist.slice(0, currentIndex);
    let lower = playlist.slice(currentIndex + 1, playlist.lenth);

    let withoutCurrent = upper.concat(lower);

    withoutCurrent = action.payload.shuffle
      ? shuffle(withoutCurrent)
      : withoutCurrent.sort(
          (first: ITrack, second: ITrack) => first.id < second.id
        );

    // update playlist with current track on top
    api.dispatch(
      actionCreators.updatePlaylist([currentTrack, ...withoutCurrent])
    );
    api.dispatch(actionCreators.changeTrack(0));
  }

  return next(action);
};

export default shuffler;
