import { SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionCreators from "../redux/actionCreators";
import { MediaState } from "../redux/types";
import withoutPropagation from "../utils/withoutPropagation";
import SkipNextIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/PauseRounded";

const Root = styled(Box, {
  name: "MuiMusicPlayer",
  slot: "controls",
})({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "nowrap",
});

interface ControlsProps {
  sx?: SxProps;
  disabled?: boolean;
  isSmall?: boolean;
}

const Controls = (props: ControlsProps) => {
  const { disabled = false, ...rest } = props;

  const mediaState = useSelector<any>(({ mediaState }) => mediaState);

  const dispatch = useDispatch();
  const onSkipNext = () => dispatch(ActionCreators.skipNext());
  const onSkipPrev = () => dispatch(ActionCreators.skipPrev());
  const onPlay = () => dispatch(ActionCreators.play());
  const onPause = () => dispatch(ActionCreators.pause());

  const playing = mediaState === MediaState.PLAYING;

  return (
    <Root sx={rest.sx}>
      {!rest.isSmall && (
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

      {!rest.isSmall && (
        <IconButton
          onClick={withoutPropagation(onSkipNext)}
          size="large"
          disabled={disabled}
        >
          <SkipNextIcon fontSize="large" />
        </IconButton>
      )}
    </Root>
  );
};

export default Controls;
