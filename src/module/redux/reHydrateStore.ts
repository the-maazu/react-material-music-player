import { MediaState, RepeatMode } from "./types";

const reHydrateStore = () => ({
  duration: 0,
  mediaState: MediaState.STOPPED,
  currentTrack: 0,
  shuffled: false,
  playlist: [], // single default empty track
  volume: 25,
  repeatMode: RepeatMode.NORMAL,
});

export default reHydrateStore;
