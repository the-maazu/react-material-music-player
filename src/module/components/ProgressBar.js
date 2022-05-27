import React from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actionCreators.js";

import { Slider, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import secondsToString from "../utils/secondsToString.js";

export default function ProgressBar(props) {
  const sx = props.sx;
  const { timeLeft, currentTime } = useSelector(
    /**@type {import("../redux/types.js").useSelectCb} */
    ({ timeLeft, currentTime }) => ({
      timeLeft,
      currentTime,
    }),
    shallowEqual
  );

  // NaN on division by zero
  const progress = (currentTime / (timeLeft + currentTime)) * 100 || 0;

  const dispatch = useDispatch();
  const onSeek = (progress) => dispatch(actionCreators.seek(progress));

  const handleSliderChange = (event, newValue) => {
    onSeek(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        wrap: "nowrap",
        alignItems: "center",
        "& > .children": {
          mx: 1,
        },
        ...sx,
      }}
    >
      <Typography className="children">
        {secondsToString(currentTime)}
      </Typography>
      <Slider
        className="children"
        aria-labelledby="continuous-slider"
        value={progress}
        onChange={handleSliderChange}
      />
      <Typography className="children">{secondsToString(timeLeft)}</Typography>
    </Box>
  );
}
