function secondsToString(seconds) {
  let minutes = Math.floor(seconds / 60).toString();
  let mseconds = Math.floor(seconds % 60).toString();

  return minutes + ":" + (mseconds.length < 2 ? "0" : "") + mseconds;
}

export default secondsToString;
