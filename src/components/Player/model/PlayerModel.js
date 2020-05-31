export default function PlayerModel(tracks){

    const self = this
    this.playlist = tracks;
    this.shuffled = false;
    this.currentTrackIndex = 0;
    this.audioElement = new Audio();

    this.addTrack = function (track){

        if(Array.isArray(track)){
            this.playlist.push(...track)
        }else  {
            this.playlist.push(track)
        }
    }

    this.removeTrack = function (index){
        
        let track = this.playlist[index];
        this.playlist = this.playlist.filter( (track, index) => index !== index)
    }

    // this.reorder = function (oldIndex, newIndex){
        
    //     if(oldIndex == newIndex)
    //     return

    //     var [begin, end] = oldIndex > newIndex ? [newIndex, oldIndex] : [oldIndex, newIndex]
    //     let sliced = self.tracks.slice(begin, end)

    //     if(newIndex > oldIndex)
    //         sliced.push(sliced.shift())
    //     else 
    //         sliced.unshift(sliced.pop())

    //     for(const element of sliced){
    //         self.tracks[begin] = element
    //         begin = begin++
    //     }

    // }

    this.getTrack = function (i){
        return this.playlist[i];
    }

    this.getCurrentTrack = function(){
        return this.playlist[this.currentTrackIndex]
    }

    this.getCurrentTrackIndex = function(){
        return this.currentTrackIndex
    }

    this.updatePlaylist = function(newList){
        let newPlaylist = new PlayerModel(newList);
        newPlaylist = this.audioElement
        newPlaylist.shuffled = this.shuffled;
        newPlaylist.currentTrackIndex = newList.findIndex( (element) => 
            element.ID == this.playlist[this.currentTrackIndex].ID
        )

        return newPlaylist;
    }

    this.getPlaylist = function(){
        return this.playlist;
    }

    this.isShuffled = function(){
        return this.shuffled
    }

    this.play = function(){

        self.audioElement.src = self.getCurrentTrack().source;

        self.audioElement.play();
    }

    this.pause = function(){
        if(self.audioElement.src !== undefined)
        self.audioElement.pause()
    }

    this.updateCurrentTrack = function(newCurrentTrackIndex){

        this.pause()

        const newPlayerModel = new PlayerModel(this.playlist)
        newPlayerModel.audioElement = this.audioElement;
        newPlayerModel.shuffled = this.shuffled
        newPlayerModel.currentTrackIndex = newCurrentTrackIndex;

        newPlayerModel.audioElement.play();

        return newPlayerModel;
    }

    this.onSkip = function(i){
        console.log(i)
        return self.updateCurrentTrack(( (this.currentTrackIndex + i) % this.playlist.size ))
    }

    this.paused = function(){
        if(self.audioElement !== undefined)
        return true;
        else
        return self.audioElement.paused
    }
}