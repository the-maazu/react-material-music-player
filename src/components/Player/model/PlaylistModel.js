export default function PlaylistModel(arrayOfTracks){

    this.currentIndex = 0
    this.playlist = arrayOfTracks

    this.addTrack = function (track){

        if(typeof track == 'array'){
            playlist.push(...track)
        }else  {
            playlist.push(track)
        }
    }

    this.removeTrack = function (index){
        const index = index;
        let track = playlist[index];
        playlist = this.playlist.filter((track)=> {playlist.findIndex(track) != index})
    }

    this.reorder = function (oldIndex, newIndex){

        if(oldIndex == newIndex)
        return

        const [begin, end] = oldIndex > newIndex ? [newIndex, oldIndex] : [oldIndex, newIndex]
        let sliced = playlist.slice(begin, end)

        if(newIndex > oldIndex)
            sliced.push(sliced.shift())
        else 
            sliced.unshift(sliced.pop())

        for(const element of sliced){
            playlist[begin] = element
            begin = begin++
        }

    }
}