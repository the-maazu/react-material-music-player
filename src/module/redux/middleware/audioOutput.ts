import { Middleware } from "@reduxjs/toolkit";
import ActionCreators from "../actionCreators";
import type { AppAction, RootState } from "../store";
import { ActionTypes, TrackData, MediaState, RepeatMode } from "../types";

class AudioOutput extends Audio {
  private track: TrackData | undefined;

  /**
   * Sets source of audio
   * @param track
   */
  setSrc(track: TrackData | undefined): void {
    if (undefined === track) return;
    if (!this.isCurrent(track)) {
      this.src = track.source;
      this.track = track;
      this.setMediaMetadata(track);
    }
  }

  setMediaMetadata(track: TrackData | null): void {
    if ("mediaSession" in navigator) {
      if (!track) navigator.mediaSession.metadata = null;
      else
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: track.title,
          artist: track.artist,
          artwork: track.coverArt ? [{ src: track.coverArt }] : undefined,
        });
    }
  }

  /**
   * Unsets audio can be used to stop play
   */
  clear(): void {
    if ("" === this.src) return;
    this.setSrc(undefined);
    this.setMediaMetadata(null);
  }

  /**
   * Check if same track loaded
   */
  isCurrent(track: TrackData): boolean | undefined {
    if (undefined === this.track) return;
    return this.track.id === track.id;
  }
}

const audio = new AudioOutput();

const audioOutput: Middleware<{}, RootState> = (api) => {
  audio.addEventListener("timeupdate", () => {
    //set current time
    api.dispatch(ActionCreators.setCurrentTime(Math.floor(audio.currentTime)));

    // Set duration track
    api.dispatch(ActionCreators.setDuration(audio.duration));

    // set time left
    api.dispatch(
      ActionCreators.setTimeLeft(
        Math.floor(
          isNaN(audio.duration) ? 0 : audio.duration - audio.currentTime
        )
      )
    );
  });

  // set error listener
  audio.addEventListener("error", () => {
    api.dispatch(ActionCreators.stop());
  });

  // set canplay listener
  audio.addEventListener("canplay", () => {
    let mediaState = api.getState().mediaState;
    if (mediaState === MediaState.PLAYING)
      audio.play().catch(() => api.dispatch(ActionCreators.stop()));
  });

  // set "on playback ended" listener
  audio.addEventListener("ended", () => {
    let state = api.getState();
    let currentTrack = state.currentTrack;
    let isLastTrack = currentTrack === state.playlist.length - 1;

    switch (state.repeatMode) {
      case RepeatMode.REPEAT_ALL:
        if (isLastTrack) api.dispatch(ActionCreators.changeTrack(0));
        else api.dispatch(ActionCreators.changeTrack(++currentTrack));
        break;
      case RepeatMode.REPEAT_ONE:
        audio.play(); // play again
        break;
      case RepeatMode.NORMAL:
      default:
        if (isLastTrack) api.dispatch(ActionCreators.stop());
        else api.dispatch(ActionCreators.changeTrack(++currentTrack));
    }
  });

  // set default volume level
  audio.volume = api.getState().volume / 100;

  return (next) => (action: AppAction) => {
    let state = api.getState();

    switch (action.type) {
      case ActionTypes.CHANGE_TRACK:
        let nexTrack = state.playlist[action.payload.index];
        audio.setSrc(nexTrack);
        if (state.mediaState === MediaState.PLAYING)
          audio.play().catch(() => api.dispatch(ActionCreators.stop()));
        break;

      case ActionTypes.PLAY:
        api.dispatch(
          ActionCreators.setCurrentTrackId(
            state.playlist[state.currentTrack].id
          )
        );
        audio.setSrc(state.playlist[state.currentTrack]);
        audio.play().catch(() => api.dispatch(ActionCreators.stop()));
        break;

      case ActionTypes.PAUSE:
        audio.pause();
        break;

      case ActionTypes.STOP:
        audio.clear();
        break;

      case ActionTypes.SEEK:
        if (!isNaN(audio.duration) && isFinite(audio.duration))
          audio.currentTime = (action.payload.progress / 100) * audio.duration;
        break;

      case ActionTypes.CHANGE_VOLUME:
        audio.volume = action.payload.volume / 100;
        break;

      case ActionTypes.SKIP_PREV:
        if (audio.currentTime > 3) {
          api.dispatch(ActionCreators.seek(0));
          return; // drop the action
        }
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default audioOutput;
