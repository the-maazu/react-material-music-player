import actionTypes from '../actionTypes.js'
import actionCreators from '../actionCreators.js'
import { MediaStates } from '../store.js';

const audioElement = new Audio();

const audioOutput = (store) => {

    audioElement.addEventListener('timeupdate', () => {
        // update current time
        store.dispatch(
            actionCreators.setCurrentTime(
                Math.floor(audioElement.currentTime)
            )
        )

        // update time left
        store.dispatch(
            actionCreators.setTimeLeft(
                Math.floor(audioElement.duration - audioElement.currentTime)
            )
        )

    })

    // set default volume level
    audioElement.volume = store.getState().volume/100

    return (next) => (action) => {

            let results = next(action);
            let state = store.getState();
        
            switch(action.type){
                case actionTypes.CHANGE_TRACK:
                    audioElement.src = state.playlist[action.payload.index].source
                    if(state.mediaState === MediaStates.playing)
                    audioElement.play() // continue playing if previous track was playing
                    break
                case actionTypes.PLAY:
                    if( audioElement.src === "" )
                        audioElement.src = state.playlist[state.currentTrack].source
                    audioElement.play()
                    break
                case actionTypes.PAUSE:
                    audioElement.pause()
                    break
                case actionTypes.STOP:
                    audioElement.src = ""
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
        
            return results;
        }

}

export default audioOutput