import actionTypes from '../actionTypes.js'

const changeTrackHelper = (store) => {

    return (next) => (action) => {

        let currentState = store.getState()

        // maintain current track if index out of bound
        if( action.type == actionTypes.CHANGE_TRACK
            && (
                action.payload.index < 0 ||
                action.payload.index >= currentState.playlist.length
            )
        ){
            action.payload.index = currentState.currentTrack 
        }

        return next(action);
        
    }

}

export default changeTrackHelper