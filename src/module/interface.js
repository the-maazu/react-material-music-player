import EventTypes from './constants/EventTypes.js'

function play( playlist ){
    const event = new CustomEvent(EventTypes.PLAY, {detail: playlist})
    window.dispatchEvent(event)
}

function playNext( playlist ){
    const event = new CustomEvent(EventTypes.PLAYNEXT, {detail: playlist})
    window.dispatchEvent(event)
}

function playLater( playlist ){
    const event = new CustomEvent(EventTypes.PLAYLATER, {detail: playlist})
    window.dispatchEvent(event)
}

const interfaceObject = {
    play: play,
    playNext: playNext,
    playLater: playLater
}

export default interfaceObject