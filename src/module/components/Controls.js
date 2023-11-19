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
  const disabled = props.disabled === undefined ? false : props.disabled;
  const isSmall = props.isSmall;

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
      {!isSmall && (
        <IconButton
          onClick={withoutPropagation(onSkipPrev)}
          size="large"
          disabled={disabled}
        >
          <SkipPreviousIcon fontSize="large" />
        </IconButton>
      )}

      <IconButton
        onClick={withoutPropagation(playing ? onPause : onPlay)}
        size="large"
        disabled={disabled}
      >
        {playing ? (
          <PauseIcon fontSize="large" />
        ) : (
          <PlayIcon fontSize="large" />
        )}
      </IconButton>

      {!isSmall && (
        <IconButton
          onClick={withoutPropagation(onSkipNext)}
          size="large"
          disabled={disabled}
        >
          <SkipNextIcon fontSize="large" />
        </IconButton>
      )}
    </Box>
  );
}
