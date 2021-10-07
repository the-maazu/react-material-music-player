/**
 * This contains all data needed for a song
 * @constructor
 * @param {!string} trackID
 * @param {!string} coverArt
 * @param {!string} title
 * @param {!string} artist
 * @param {!string} source
 */
export default function TrackModel(trackID, coverArt, title, artist, source) {
  this.ID = trackID;
  this.coverArt = coverArt;
  this.title = title;
  this.artist = artist;
  this.source = source;

  this.getSource = function () {
    return source;
  };
}
