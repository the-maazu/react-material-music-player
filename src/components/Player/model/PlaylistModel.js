export default function PlaylistModel(arrayOfTracks){

    var self = this;

    this.currentTrack = 0
    this.tracks = arrayOfTracks

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

    this.updatePlayList = function (newList){
        this.tracks = newList;
    }

    this.reorder = function (oldIndex, newIndex){
        
        if(oldIndex == newIndex)
        return

        var [begin, end] = oldIndex > newIndex ? [newIndex, oldIndex] : [oldIndex, newIndex]
        let sliced = self.tracks.slice(begin, end)

        if(newIndex > oldIndex)
            sliced.push(sliced.shift())
        else 
            sliced.unshift(sliced.pop())

        for(const element of sliced){
            self.tracks[begin] = element
            begin = begin++
        }

    }
}