import actionTypes from '../actionTypes.js'
import actionCreators from '../actionCreators.js'
import { MediaStates } from '../store.js';

import AudioOutput from '../../model/AudioOutput.js';

const audioElement = new AudioOutput()

const audioOutput = (store) => {

    audioElement.addEventListener('timeupdate', () => {

        //set current time updater
        store.dispatch(
            actionCreators.setCurrentTime(
                Math.floor(audioElement.currentTime)
            )
        )

        // set time left updater
        store.dispatch(
            actionCreators.setTimeLeft(
                Math.floor(isNaN(audioElement.duration)? 0 : audioElement.duration - audioElement.currentTime)
            )
        )

        // set canplay listener incase there is buffering
        audioElement.addEventListener('canplay', ()=>{
            let mediaState = store.getState().mediaState
            if(mediaState === MediaStates.playing)
            audioElement.play()
        })

        // skip to next track after playback ends
        audioElement.addEventListener('ended', ()=>{

            // check if fully ended
            if(audioElement.currentTime !== audioElement.duration)
            return

            let currentIndex = store.getState().currentTrack
            let mediaState = store.getState().mediaState

            if(mediaState === MediaStates.playing)
            store.dispatch(actionCreators.changeTrack(++currentIndex))
        })
    })

    // set default volume level
    audioElement.volume = store.getState().volume/100

    return (next) => (action) => {

        let state = store.getState();
    
        switch(action.type){
            case actionTypes.CHANGE_TRACK:
                let currentTrack = audioElement.track
                let newTrack = state.playlist[action.payload.index]

                if(currentTrack.ID !== newTrack.ID) // only update if not same track
                {
                    audioElement.src = state.playlist[action.payload.index]
                    if(
                        state.mediaState === MediaStates.playing 
                        && audioElement.readyState >= 2 ) // buffered enough to start playing
                    audioElement.play() // continue playing if previous track was playing
                }
                break

            case actionTypes.PLAY:
                if( audioElement.src === "" )
                    audioElement.src = state.playlist[state.currentTrack]
                audioElement.play()
                break

            case actionTypes.PAUSE:
                audioElement.pause()
                break

            case actionTypes.STOP:
                audioElement.src = ""
                break

            case actionTypes.SEEK:
                if( audioElement.src !== "")
                audioElement.currentTime = action.payload.time;
                break

            case actionTypes.CHANGE_VOLUME:
                audioElement.volume = action.payload.volume/100;
                break

            default:
                break
        }
    
        return next(action);
    }

}

export default audioOutput