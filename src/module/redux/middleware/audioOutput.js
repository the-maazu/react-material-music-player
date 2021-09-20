import actionTypes from '../actionTypes.js'
import actionCreators from '../actionCreators.js'
import { MediaStates } from '../store.js';

import AudioOutput from '../../model/AudioOutput.js';

const audioElement = new AudioOutput()

const audioOutput = (store) => {

    audioElement.addEventListener('timeupdate', () => {

        //set current time
        store.dispatch(
            actionCreators.setCurrentTime(
                Math.floor(audioElement.currentTime)
            )
        )

        // set time left
        store.dispatch(
            actionCreators.setTimeLeft(
                Math.floor(
                    isNaN(audioElement.duration)? 
                    0 : audioElement.duration - audioElement.currentTime
                )
            )
        )
    })

    // set error listener
    audioElement.addEventListener('error', ()=>{
        store.dispatch(actionCreators.stop())
    })

    // set canplay listener
    audioElement.addEventListener('canplay', ()=>{
        let mediaState = store.getState().mediaState
        if(mediaState === MediaStates.playing)
        audioElement.play().catch(
            () => store.dispatch(actionCreators.stop())
        )
    })

    // skip to next track after playback ends
    audioElement.addEventListener('ended', ()=>{

        let currentIndex = store.getState().currentTrack
        let mediaState = store.getState().mediaState

        if(store.getState().currentTrack === store.getState().playlist.length-1)
            store.dispatch(actionCreators.stop())
        else if(mediaState === MediaStates.playing)
            store.dispatch(actionCreators.changeTrack(++currentIndex))
    })

    // set default volume level
    audioElement.volume = store.getState().volume/100

    return (next) => (action) => {

        let state = store.getState();

        switch(action.type){
            case actionTypes.CHANGE_TRACK:
                 let nexTrack = state.playlist[action.payload.index]
                audioElement.setSrc(nexTrack)
                break

            case actionTypes.PLAY:
                audioElement.setSrc(state.playlist[state.currentTrack]) 
                audioElement.play().catch(
                    () => store.dispatch(actionCreators.stop())
                )
                break;

            case actionTypes.PAUSE:
                audioElement.pause()
                break

            case actionTypes.STOP:
                audioElement.clear()
                break

            case actionTypes.SEEK:
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