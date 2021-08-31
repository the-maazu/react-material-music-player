import actionTypes from '../actionTypes.js'

const changeTrackHelper = (store) => {

    return (next) => (action) => {

        let currentState = store.getState()

        // stop dispatch if current track if index out of bound
        if( action.type == actionTypes.CHANGE_TRACK
            && (
                action.payload.index < 0 ||
                action.payload.index >= currentState.playlist.length
            )
        )
            return;
        

        return next(action);
        
    }

}

export default changeTrackHelper