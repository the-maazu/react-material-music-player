import actionTypes from '../actionTypes.js'
import actionCreators from '../actionCreators.js'

const audioElement = new Audio();

const audioOutput = (store) => {

    let progressWorker

    function setProgressWorker(){
        
        // clear before generating new worker
        window.clearInterval(progressWorker)

        progressWorker = window.setInterval(
            () => {
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
            },
            1000 // 1s interval
        )
    }

    function clearProgressWorker(){
        window.clearInterval(progressWorker)
    }

    // set default volume level
    audioElement.volume = store.getState().volume/100

    return (next) => (action) => {

            let results = next(action);
            let state = store.getState();
        
            switch(action.type){
                case actionTypes.CHANGE_TRACK:
                    // break if new source same as current source
                    if(audioElement.src.includes(state.playlist[state.currentTrack].source))
                    break
                    audioElement.src = state.playlist[state.currentTrack].source
                    audioElement.play()
                    break
                case actionTypes.PLAY:
                    if( audioElement.src == "" )
                        audioElement.src = state.playlist[state.currentTrack].source
                    audioElement.play()
                    setProgressWorker();
                    break
                case actionTypes.PAUSE:
                    audioElement.pause()
                    break
                case actionTypes.STOP:
                    audioElement.src = ""
                    clearProgressWorker()
                    break
                case actionTypes.SEEK:
                    audioElement.currentTime = action.payload.time;
                    break
                case actionTypes.CHANGE_VOLUME:
                    audioElement.volume = action.payload.volume/100;
                    break
            }
        
            return results;
        }

}

export default audioOutput