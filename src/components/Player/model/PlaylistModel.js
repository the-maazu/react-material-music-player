export default function PlaylistModel(arrayOfTracks){

    var self = this;

    this.tracks = arrayOfTracks;
    this.shuffled = false;
    this.currentTrackIndex = 0;

    this.addTrack = function (track){

        if(Array.isArray(track)){
            self.tracks.push(...track)
        }else  {
            self.tracks.push(track)
        }
    }

    this.removeTrack = function (index){
        
        let track = self.tracks[index];
        self.tracks = self.tracks.filter( (track, index) => index !== index)
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
        return this.tracks[i];
    }

    this.getCurrentTrack = function(){
        return this.tracks[this.currentTrackIndex]
    }

    this.getCurrentTrackIndex = function(){
        return this.currentTrackIndex
    }

    this.getNewPlaylist = function(newList){
        let newPlaylist = new PlaylistModel(newList);
        newPlaylist.shuffled = this.shuffled;
        newPlaylist.currentTrackIndex = newList.findIndex( (element) => 
            element.ID == this.tracks[this.currentTrackIndex].ID
        )

        return newPlaylist;
    }

    this.getPlaylist = function(){
        return this.tracks;
    }

    this.isShuffled = function(){
        return this.shuffled
    }
}