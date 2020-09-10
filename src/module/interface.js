import EventTypes from './constants/EventTypes.js'
import store from './redux/store.js'


function play( playlist ){
    const event = new CustomEvent(EventTypes.PLAY, {detail: playlist})
    window.dispatchEvent(event)
}

export default {
    play: play
}