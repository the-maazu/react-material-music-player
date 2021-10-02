import React from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/PauseRounded";
import { Box } from "@mui/material";

import actionCreators from "../redux/actionCreators";
import withoutPropagation from "../utils/withoutPropagation";
import { MediaStates } from "../redux/store";

export default function Controls(props) {
  const sx = props.sx;

  const { mediaState, currentTrack } = useSelector(
    ({ mediaState, currentTrack }) => ({ mediaState, currentTrack }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const onSkipNext = () =>
    dispatch(actionCreators.changeTrack(currentTrack + 1));
  const onSkipPrev = () =>
    dispatch(actionCreators.changeTrack(currentTrack - 1));
  const onPlay = () => dispatch(actionCreators.play());
  const onPause = () => dispatch(actionCreators.pause());

  const playing = mediaState === MediaStates.playing ? true : false;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        ...sx,
      }}
    >
      <IconButton onClick={withoutPropagation(onSkipPrev)} size="large">
        <SkipPreviousIcon fontSize="large" />
      </IconButton>

      <IconButton
        onClick={withoutPropagation(playing ? onPause : onPlay)}
        size="large"
      >
        {playing ? (
          <PauseIcon fontSize="large" />
        ) : (
          <PlayIcon fontSize="large" />
        )}
      </IconButton>

      <IconButton onClick={withoutPropagation(onSkipNext)} size="large">
        <SkipNextIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
