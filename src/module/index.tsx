import * as React from "react";
import { Provider } from "react-redux";
import PlayerRoot, { PlayerProps } from "./components/Player";
import PlayerInterface from "./interface";
import store from "./redux/store";
import { Track, RepeatMode as RepeatModes, TrackData } from "./redux/types";

const AudioPlayer = (props: PlayerProps) => (
  <Provider store={store}>
    <PlayerRoot {...props} />
  </Provider>
);

export default AudioPlayer;

export type { PlayerProps, TrackData };
export { PlayerInterface, RepeatModes, Track };
