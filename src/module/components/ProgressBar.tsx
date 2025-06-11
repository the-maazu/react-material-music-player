import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";
import { Duration } from "luxon";
import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actionCreators";
import secondsToString from "../utils/secondsToString";

const Root = styled(Box, {
  name: "MuiMusicPlayer",
  slot: "progressBar"
})({
  display: "flex",
  flexDirection: "row",
  wrap: "nowrap",
  alignItems: "center"
});

export interface ProgressBarProps {
  sx?: SxProps;
  displayTrackDuration?: boolean;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { displayTrackDuration = false, sx } = props;

  const { timeLeft, currentTime, duration } = useSelector<any, any>(
    ({ timeLeft, currentTime, duration }) => ({
      timeLeft,
      currentTime,
      duration
    }),
    shallowEqual
  );

  // NaN on division by zero
  const progress = (currentTime / (timeLeft + currentTime)) * 100 || 0;

  const dispatch = useDispatch();
  const onSeek = (progress: number | number[]) => dispatch(actionCreators.seek(progress));

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    onSeek(newValue);
  };

  return (
    <Root sx={ sx }>
      <Typography sx={ { mx: 1 } }>
        { secondsToString(currentTime) }
      </Typography>
      <Slider
        sx={ { mx: 1 } }
        aria-labelledby="continuous-slider"
        value={ progress }
        onChange={ handleSliderChange }
      />
      <Typography sx={ { mx: 1 } }>
        { displayTrackDuration && Duration.fromMillis(!isNaN(duration) ? (duration * 1000) : 0).toFormat("hh:mm:ss") }
        { !displayTrackDuration && Duration.fromMillis(timeLeft * 1000).toFormat("hh:mm:ss") }
      </Typography>
    </Root>
  );
};

export default ProgressBar;
