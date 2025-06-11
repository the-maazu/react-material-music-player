import { styled, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actionCreators";
import withoutPropagation from "../utils/withoutPropagation";
import { RootState } from "../redux/store";
import VolumeUpIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeDownIcon from "@mui/icons-material/VolumeDownRounded";

const Root = styled(Box, {
  name: "MuiMusicPlayer",
  slot: "volumeControl",
})({
  display: "flex",
  flexDirection: "row",
  wrap: "nowrap",
  alignItems: "center",
});

interface VolumeControlProps {
  sx?: SxProps;
}

const VolumeControl = (props: VolumeControlProps) => {
  const dispatch = useDispatch();
  const onVolumeChange = (value: number | number[]) =>
    dispatch(actionCreators.setVolume(value));

  const value = useSelector<RootState, number>((state) => state.volume);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onVolumeChange(newValue);
  };

  return (
    <Root sx={props.sx}>
      <IconButton
        sx={{ mx: 1 }}
        onClick={withoutPropagation(
          onVolumeChange,
          value < 10 ? 0 : value - 10
        )}
        size="large"
      >
        <VolumeDownIcon />
      </IconButton>
      <Slider
        sx={{ mx: 1 }}
        value={value}
        aria-labelledby="continuous-slider"
        onChange={handleSliderChange}
      />
      <IconButton
        sx={{ mx: 1 }}
        onClick={withoutPropagation(
          onVolumeChange,
          value > 90 ? 100 : value + 10
        )}
        size="large"
      >
        <VolumeUpIcon />
      </IconButton>
    </Root>
  );
};

export default VolumeControl;
