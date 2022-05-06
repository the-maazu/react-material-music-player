import React from "react";

import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actionCreators";

import { Slider, IconButton, Box } from "@mui/material";
import {
  VolumeUp as VolumeUpIcon,
  VolumeDown as VolumeDownIcon,
} from "@mui/icons-material";

import withoutPropagation from "../utils/withoutPropagation";

export default function VolumeControl(props) {
  const sx = props.sx;

  const dispatch = useDispatch();
  const onVolumeChange = (value) => dispatch(actionCreators.setVolume(value));

  const value = useSelector(
    /**@type {import("../redux/types").useSelectCb} */
    (state) => state.volume
  );

  const handleSliderChange = (event, newValue) => {
    onVolumeChange(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        direction: "row",
        wrap: "nowrap",
        alignItems: "center",
        "& > .children": {
          mx: 1,
        },
        ...sx,
      }}
    >
      <IconButton
        className="children"
        onClick={withoutPropagation(
          onVolumeChange,
          value < 10 ? 0 : value - 10
        )}
        size="large"
      >
        <VolumeDownIcon />
      </IconButton>
      <Slider
        className="children"
        value={value}
        aria-labelledby="continuous-slider"
        onChange={handleSliderChange}
      />
      <IconButton
        className="children"
        onClick={withoutPropagation(
          onVolumeChange,
          value > 90 ? 100 : value + 10
        )}
        size="large"
      >
        <VolumeUpIcon />
      </IconButton>
    </Box>
  );
}
