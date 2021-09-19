import TrackModel from './TrackModel'

export default class AudioOutput extends Audio{

    constructor(){
        super()
        this.src = new TrackModel(-1,"", "", "", "") // default track
    }

    set src(track){
        if(track !==  undefined || track !== ""){
            this.track = track
            super.src = track.source
        }else super.src = ""
    }

    get src(){
        return super.src
    }

    isCurrent(track){
        if(typeof track === "string")
            return super.src === track;
        else return super.src === track.source
    }
}