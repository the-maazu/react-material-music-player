import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionCreators from "../redux/actionCreators.js";

import {
  Shuffle as ShuffleIcon,
  QueueMusic as PlaylistIcon,
} from "@mui/icons-material/";
import { Popover, Collapse, Box, ToggleButton } from "@mui/material/";

import Playlist from "./Playlist.js";

export default function PlaylistControl(props) {
  const sx = props.sx;
  const playlistViewMode = props.playlistViewMode;

  const shuffled = useSelector((state) => state.shuffled);
  const [playlistVisible, showPlaylist] = useState(false);
  const [anchorEl, setAnchor] = useState(null);

  const dispatch = useDispatch();
  const onShuffle = (bool) => dispatch(actionCreators.shuffle(bool));

  const handlePopoverClose = () => {
    showPlaylist(false);
    setAnchor(null);
  };

  const buttonsContainerRef = React.useRef();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box
        ref={buttonsContainerRef}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          "& > .children": {
            mx: 0.5,
            flexGrow: 1,
          },
        }}
      >
        <ToggleButton
          className="children"
          value="shuffle"
          selected={shuffled}
          onChange={() => {
            onShuffle(!shuffled);
          }}
        >
          <ShuffleIcon />
        </ToggleButton>

        <ToggleButton
          className="children"
          value="show playlist"
          selected={playlistVisible}
          onChange={() => {
            setAnchor(buttonsContainerRef.current);
            showPlaylist(!playlistVisible);
          }}
        >
          <PlaylistIcon />
        </ToggleButton>
      </Box>

      {playlistViewMode === "popover" ? (
        <Popover
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
              width: "30vw",
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
    </Box>
  );
}
