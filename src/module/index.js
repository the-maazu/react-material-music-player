import React from "react";
import { Provider } from "react-redux";

import Player from "./components/Player.js";
import { Track } from "./redux/types.js";
import playerInterface from "./interface.js";
import store from "./redux/store.js";

export default function main(props) {
  return (
    <Provider store={store}>
      <Player {...props} />
    </Provider>
  );
}
export const TrackModel = Track;
export const PlayerInterface = playerInterface;
