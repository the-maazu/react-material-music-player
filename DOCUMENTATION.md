# Documentation (beta)

## Additions to the interface

<pre><code>
    PlayerInterface.setPlaylist(Track[]) // sets a new playlist, can be an empty array
    PlayerInterface.clearPlaylist() // similar to setting empty array

    PlayerInterface.play( Track[] ) // sets a new playlist and starts playing
    PlayerInterface.play() // play current track if paused or stopped
    PlayerInterface.pause() // pause current track
    PlayerInterface.stop() // stop scurrent track

    PlayerInterface.skipNext() // skip to next track
    PlayerInterface.skipPrev() // skip to previous track when play time is less than 3 seconds else restart current track
    PlayerInterface.changeTrack(index: int) // switch to track at index, out of bund index ignored.

    PlayerInterface.seek(progress: int) // integer from 0 to 100 as percentage of audio duration, out of bound inputs ignored.

    PlayerInterface.setVolume(volme: int) // integer from 0 to 100, out of bound inputs ignored.

    PlayerInterface.shuffle(bool) // true or false to turn on/off shuffle

    import {RepeatModes} from 'react-material-music-player'
    PlayerInterface.setRepeatMode(mode: "NORMAL" || "REPEAT_ALL" || "REPEAT_ONE") // predefined strings with enum above, example: RepeatModes.NORMAL

    PlayerInterface.playLater( Track[] ) // appends to end of playlist
    PlayerInterface.playNext( Track[] ) // insert after current track:

    PlayerInterface.getState() // returns state object
    PlayerInterface.subscribe((state) => {...}) // listen for change
    State: {
        mediaState: "STOPPED" || "PLAYING" || "PAUSED",
        playlist: Track[],
        currentTrack: number, // index
        shuffled: boolean,
        currentTime: number, // seconds
        timeLeft: number, // seconds
        volume: number, // min:0 max:100
        repeatMode: "NORMAL" || "REPEAT_ALL" || "REPEAT_ONE",
    }
</code></pre>
