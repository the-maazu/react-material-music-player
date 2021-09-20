import actionCreators from '../actionCreators.js'
import actionTypes from '../actionTypes.js'

const updatePlaylistHelper = (store) => {

    return (next) => (action) => {

        let state = store.getState()
        let currentTrack = state.currentTrack

        // stop dispatch if current track index out of bound
        if( action.type === actionTypes.UPDATE_PLAYLIST
            && currentTrack >= action.payload.playlist.length
        )
            store.dispatch(actionCreators.changeTrack(0))
        

        return next(action);
        
    }

}

export default updatePlaylistHelper