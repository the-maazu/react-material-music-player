function secondsToString(seconds){

    let minutes = new String(Math.floor(seconds/60)) 
    let mseconds = new String(Math.floor(seconds%60))

    return minutes + ':' + ( mseconds.length < 2 ? '0' : '' ) + mseconds
}

export default secondsToString