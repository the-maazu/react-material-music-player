import actionCreators from '../actionCreators.js';
import EventTypes from '../../constants/EventTypes.js'

export default function eventHandler(store){

    window.addEventListener( 
        EventTypes.PLAY, 
        function(e) { 
            store.dispatch(
                actionCreators.updatePlaylist(e.detail)
            )
        }
    );



    // track change event listener
    let playNextAfterHandler = (e) => {

        let currentPlaylist = store.getState().playlist
        let currentTrack = store.getState().currentTrack

        let newPlaylist = []

        if(e.type === EventTypes.PLAYNEXT)
            newPlaylist = currentPlaylist.reduce( 

                (accumulator, currentValue , index) => {

                    if(index === currentTrack)
                        return [...accumulator, currentValue, ...e.detail]
                    else    return [...accumulator, currentValue]
                },
                []
            )
        else if(e.type === EventTypes.PLAYLATER){
            newPlaylist = currentPlaylist.concat(e.detail)
        }

        store.dispatch(
            actionCreators.updatePlaylist(newPlaylist)
        )
    }

    window.addEventListener( 
        EventTypes.PLAYNEXT, 
        playNextAfterHandler
    );

    window.addEventListener( 
        EventTypes.PLAYLATER, 
        playNextAfterHandler
    );

    return (next) => (action) => {
         return next(action)
    }

}