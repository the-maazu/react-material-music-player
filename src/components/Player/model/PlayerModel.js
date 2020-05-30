export default function PlaylistModel(tracks){

    this.playlist = tracks;
    this.shuffled = false;
    this.currentTrackIndex = 0;

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

    this.getNewPlaylist = function(newList){
        let newPlaylist = new PlaylistModel(newList);
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
}