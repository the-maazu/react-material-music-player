import actionTypes from '../actionTypes.js'
import actionCreators from '../actionCreators.js'

import shuffle from '../../utils/shuffle.js'

import MediaStates from '../store.js'

let playlist // variable to keep original playlist
const shuffler = (store) => (next) => (action) => {

    let results = next(action);
    let state = store.getState();

    if(action.type === actionTypes.SHUFFLE){
        
        if( action.payload.shuffle){

            playlist = Array.from(state.playlist);
            let shuffledPlaylist = shuffle(playlist);
            
            store.dispatch(
                actionCreators.updatePlaylist(shuffledPlaylist)
            )
            
            // update current track after shuffle track only when paused or playing
            if(state.mediaState !== MediaStates.stopped){

                let currentTrackID = state.playlist[state.currentTrack].ID

                let newCurrentTrack = shuffledPlaylist.findIndex(
                    (track) => track.ID === currentTrackID
                )

                store.dispatch(actionCreators.changeTrack(newCurrentTrack))
            }
        }
        else if( !action.payload.shuffle && playlist != null){
            store.dispatch(actionCreators.updatePlaylist(playlist))
        }
    }

    return results;
}

export default shuffler