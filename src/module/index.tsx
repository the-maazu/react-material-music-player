import * as React from "react";
import { Provider } from "react-redux";
import PlayerRoot, { PlayerProps } from "./components/Player";
import PlayerInterface from "./interface";
import store from "./redux/store";
import { ITrack, RepeatMode as RepeatModes } from "./redux/types";

const AudioPlayer = (props: PlayerProps) => (
  <Provider store={ store }>
    <PlayerRoot { ...props } />
  </Provider>
);

export default AudioPlayer;

export { type ITrack, PlayerInterface, type PlayerProps, RepeatModes };
