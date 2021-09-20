import TrackModel from './TrackModel'

export default class AudioOutput extends Audio{

    constructor(){
        super()
        this.src = new TrackModel(-1,"", "", "", "") // default track
    }

    set src(track){
        if(track === undefined)
            super.src = ""      
        if(this.isCurrent(track))
            return
        else {
            super.src = track.source
        }
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