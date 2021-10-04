import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionCreators from "../../redux/actionCreators.js";

import {
  ShuffleRounded,
  ShuffleOnRounded,
  QueueMusicRounded as PlaylistIcon,
  RepeatRounded,
  RepeatOnRounded,
  RepeatOneOnRounded,
} from "@mui/icons-material/";
import { Popover, Collapse, Box, ToggleButton } from "@mui/material/";
import styled from "@mui/material/styles/styled";

import Playlist from "./Playlist.js";

import { RepeatModes } from "../../redux/StoreTypes";

const PREFIX = "PlaylistControl";

const classes = {
  button: `${PREFIX}-button`,
};

const RootBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "center",
}));

const BouttonContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",

  [`& .${classes.button}`]: {
    // space buttons horizontally
    margin: `auto ${theme.spacing(1)}`,
    flexGrow: 1, // buttons should grow
    border: 0, // remove toggle button borders
  },
}));

function RepeatButton(props) {
  const { value, ...other } = props;

  return (
    <ToggleButton selected={value !== RepeatModes.normal} {...other}>
      {value === RepeatModes.normal ? (
        <RepeatRounded />
      ) : value === RepeatModes.repeatAll ? (
        <RepeatOnRounded />
      ) : (
        <RepeatOneOnRounded />
      )}
    </ToggleButton>
  );
}

function ShuffleButton(props) {
  const { value, ...other } = props;

  return (
    <ToggleButton selected={value} {...other}>
      {value ? <ShuffleOnRounded /> : <ShuffleRounded />}
    </ToggleButton>
  );
}

export default function PlaylistControl(props) {
  const sx = props.sx;
  const playlistViewMode = props.playlistViewMode;

  const shuffled = useSelector((state) => state.shuffled);
  const repeatMode = useSelector((state) => state.repeatMode);
  const [playlistVisible, showPlaylist] = useState(false);
  const [anchorEl, setAnchor] = useState(null);

  const dispatch = useDispatch();
  const onShuffle = (bool) => dispatch(actionCreators.shuffle(bool));
  const onRepeat = () => dispatch(actionCreators.setRepeatMode());

  const handlePopoverClose = () => {
    showPlaylist(false);
    setAnchor(null);
  };

  return (
    <RootBox sx={{ ...sx }}>
      <BouttonContainer>
        <RepeatButton
          value={repeatMode}
          className={classes.button}
          onClick={() => {
            onRepeat();
          }}
        />
        <ShuffleButton
          value={shuffled}
          className={classes.button}
          onClick={() => {
            onShuffle(!shuffled);
          }}
        />
        <ToggleButton
          className={classes.button}
          value="show playlist"
          selected={playlistVisible}
          onChange={(e) => {
            setAnchor(
              e.target.parentElement.parentElement.parentElement.parentElement
            );
            showPlaylist(!playlistVisible);
          }}
        >
          <PlaylistIcon />
        </ToggleButton>
      </BouttonContainer>

      {playlistViewMode === "popover" ? (
        <Popover
          elevation={1}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Playlist
            sx={{
              width: "400px",
              height: "60vh",
            }}
          />
        </Popover>
      ) : (
        <Collapse collapsedSize={"0"} in={playlistVisible}>
          <Playlist
            sx={{
              height: "60vh",
              width: "90vw",
            }}
          />
        </Collapse>
      )}
    </RootBox>
  );
}
