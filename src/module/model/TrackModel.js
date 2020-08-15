export default function Track(trackID,coverArt, title, artist, source){
    this.ID = trackID
    this.coverArt = coverArt
    this.title = title
    this.artist = artist
    this.source = source

    this.getSource = function(){
        return source;
    }
}