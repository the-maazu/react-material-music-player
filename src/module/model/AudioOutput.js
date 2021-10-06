import TrackModel from "./TrackModel";

export default class AudioOutput extends Audio {
  constructor() {
    super();
    this.track = new TrackModel(-1, "", "", "", ""); // default track
  }

  setSrc(track) {
    if (track === undefined) return;
    if (!this.isCurrent(track)) {
      super.src = track.source;
      this.track = track;
    }
  }

  clear() {
    if (super.src === "") return;
    this.setSrc(new TrackModel(-1, "", "", "", ""));
  }
  isCurrent(track) {
    return this.track.ID === track.ID;
  }
}
