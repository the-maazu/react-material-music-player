import TrackModel from "./TrackModel";

export default class AudioOutput extends Audio {
  constructor() {
    super();
    this.track = new TrackModel("", "", "", "", ""); // default track
  }

  setSrc(track) {
    if (track === undefined) return;
    if (!this.isCurrent(track)) {
      this.src = track.source;
      this.track = track;
    }
  }

  clear() {
    if (this.src === "") return;
    this.setSrc(new TrackModel("", "", "", "", ""));
  }
  isCurrent(track) {
    return this.track.ID === track.ID;
  }
}
