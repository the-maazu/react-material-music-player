import React from "react";

import { useSelector, useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/PauseRounded";
import { Box } from "@mui/material";

import ActionCreators from "../redux/actionCreators";
import withoutPropagation from "../utils/withoutPropagation";
import { MediaState } from "../redux/types";

export default function Controls(props) {
  const sx = props.sx;

  const mediaState = useSelector(
    /** @type {import("../redux/types").useSelectCb} */
    ({ mediaState }) => mediaState
  );

  const dispatch = useDispatch();
  const onSkipNext = () => dispatch(ActionCreators.skipNext());
  const onSkipPrev = () => dispatch(ActionCreators.skipPrev());
  const onPlay = () => dispatch(ActionCreators.play());
  const onPause = () => dispatch(ActionCreators.pause());

  const playing = mediaState === MediaState.PLAYING ? true : false;

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
