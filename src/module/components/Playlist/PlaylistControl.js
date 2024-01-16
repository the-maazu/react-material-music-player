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
} from "@mui/icons-material";
import { Popover, Collapse, Box, ToggleButton } from "@mui/material";
import styled from "@mui/material/styles/styled";

import Playlist from "./Playlist.js";

import { RepeatMode } from "../../redux/types";

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
  },
}));

function RepeatButton(props) {
  const { value, ...other } = props;

  return (
    <ToggleButton
      value="repeat"
      selected={value !== RepeatMode.NORMAL}
      {...other}
    >
      {value === RepeatMode.NORMAL ? (
        <RepeatRounded />
      ) : value === RepeatMode.REPEAT_ALL ? (
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
    <ToggleButton value="shuffle" selected={value} {...other}>
      {value ? <ShuffleOnRounded /> : <ShuffleRounded />}
    </ToggleButton>
  );
}

export default function PlaylistControl(props) {
  const sx = props.sx;
  const playlistViewMode = props.playlistViewMode;

  const shuffled = useSelector(
    /** @type {import("../../redux/types").useSelectCb} */
    (state) => state.shuffled
  );
  const repeatMode = useSelector(
    /** @type {import("../../redux/types").useSelectCb} */
    (state) => state.repeatMode
  );
  const [playlistVisible, showPlaylist] = useState(false);
  const [anchorEl, setAnchor] = useState(null);

  const dispatch = useDispatch();
  const onShuffle = (bool) => dispatch(actionCreators.shuffle(bool));
  const onRepeat = (mode) => dispatch(actionCreators.setRepeatMode(mode));

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
            switch (repeatMode) {
              case RepeatMode.NORMAL:
                return onRepeat(RepeatMode.REPEAT_ALL);
              case RepeatMode.REPEAT_ALL:
                return onRepeat(RepeatMode.REPEAT_ONE);
              case RepeatMode.REPEAT_ONE:
                return onRepeat(RepeatMode.NORMAL);
              default:
                return repeatMode;
            }
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
              /** @type {Node} */ (e.target).parentElement.parentElement
                .parentElement.parentElement
            );
            showPlaylist(!playlistVisible);
          }}
        >
          <PlaylistIcon />
        </ToggleButton>
      </BouttonContainer>

      {playlistViewMode === "popover" ? (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          sx={{ boxShadow: 8 }}
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
