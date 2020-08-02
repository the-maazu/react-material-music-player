import actionTypes from './actionTypes.js'

export default {

    skipNext: (index, size) =>  ({
        type: actionTypes.CHANGE_TRACK,
        payload: {
            index: (index+1)% size
        }
    }),

    skipPrev: (index, size) =>  ({
        type: actionTypes.CHANGE_TRACK,
        payload: {
            index: (index-1)% size
        }
    }),

    play: () => ({
        type: actionTypes.PLAY,
    }),

    pause: () => ({
        type: actionTypes.PAUSE
    }),

    updatePlaylist: (playlist) => ({
        type: actionTypes.UPDATE_PLAYLIST,
        payload: {
            playlist: playlist
        }
    }),

    volumeChange: (level) => ({
        type: actionTypes.VOLUME_CHANGE,
        payload: {
            level: level
        }
    }),

    shuffle: (bool) => ({
        type: actionTypes.SHUFFLE,
        payload: {shuffle: bool}
    }),

    maximise: () => ({
        type: actionTypes.MAXIMISE
    }),

    minimise: ()=> ({
        type: actionTypes.MINIMISE
    }),

    setCurrentTime: (currentTime) => ({
        type: actionTypes.SET_CURRENT_TIME,
        payload: {
            currentTime: currentTime
        }
    }),

    setTimeLeft: (timeLeft) => ({
        type: actionTypes.SET_TIME_LEFT,
        payload : {
            timeLeft: timeLeft
        }
    })
}