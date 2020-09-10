import actionCreators from '../actionCreators.js';
import EventTypes from '../../constants/EventTypes.js'

export default function eventHandler(store){

    window.addEventListener( 
        EventTypes.PLAY, 
        function(e) { 
            console.log(e)
            store.dispatch(
                actionCreators.updatePlaylist(e.detail)
            )
        }
    );

    return (next) => (action) => {
         return next(action)
    }

}