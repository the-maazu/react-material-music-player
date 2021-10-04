import React, { useState, useEffect } from "react";

import { useSelector, shallowEqual } from "react-redux";

import { useTheme, styled } from "@mui/material/styles";
import { Box, SwipeableDrawer, Paper } from "@mui/material";

import CoverArt from "./CoverArt.js";
import TrackDetails from "./TrackDetials.js";
import ProgressBar from "./ProgressBar.js";
import Controls from "./Controls.js";
import VolumeControl from "./VolumeControl.js";
import PlaylistControl from "./Playlist/PlaylistControl.js";

const PREFIX = "Player";

const RootPaper = styled(Paper)(({ theme }) => ({
  // prevent screen size overflow by making padding part of dimensions
  boxSizing: "border-box",
  // only pad left and right; top padding too much
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  // incase of overflow in undocked mode
  overflow: "hidden",
}));

const SwipeableDrawerRoot = styled(Box)(({ theme }) => ({
  // fixed size root for swipeable
  // width including padding
  // boxSizing: "border-box",
  height: "90vh",
  marginTop: theme.spacing(3),
  padding: theme.spacing(1),
  overflow: "hidden",

  // puller to be positioned middle of the parent's border
  [`& > .${PREFIX}-swipeable-puller`]: {
    width: 30,
    height: theme.spacing(1),
    backgroundColor: theme.palette.action.active, // button color
    borderRadius: 3,
    // position
    position: "absolute",
    top: theme.spacing(1), // center in parent border
    left: "calc(50% - 15px)", // center horizontally
  },
}));

const RowBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "nowrap",
}));

const ColumnBox = styled(Box)(() => ({
  // fill swipeable drawer root
  width: "100%",
  height: "100%",
  // flexbox
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
  alignItems: "stretch",
  flexWrap: "nowrap",
}));

// box center child
const CenterChildBox = styled(Box)(() => ({
  // flexbox
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "nowrap",
}));

export default function Player(props) {
  const sx = props.sx;
  const docked = props.docked === undefined ? true : props.docked;

  const theme = useTheme();

  const [maximised, setMaximised] = useState(false);
  const [isLarge, setLarge] = useState(false);

  const { currentTrack, playlist } = useSelector(
    ({ currentTrack, maximised, playlist }) => ({
      currentTrack,
      maximised,
      playlist,
    }),
    shallowEqual
  );

  const openSwipeableDrawer = () => {
    // only maximise if docked and not large
    if (docked && !isLarge) {
      setMaximised(true);
    }
  };

  const closeSwipeableDrawer = () => {
    // only close if its maximised
    if (maximised) {
      setMaximised(false);
    }
  };

  const rowView = () => (
    <RowBox onClick={openSwipeableDrawer}>
      <CoverArt
        src={playlist[currentTrack].coverArt}
        sx={{
          height: "48px",
          width: "48px",
          flexShrink: 0,
        }}
      />
      <TrackDetails
        sx={{
          // fixed size to stop resize on content change
          width: "120px",
          // grow if screen is small to cover extra space
          flexGrow: isLarge ? 0 : 1,
          textAlign: "left",
          margin: 1,
          flexShrink: 0,
        }}
      />
      <Controls size={isLarge ? "large" : "small"} />
      {isLarge ? (
        <>
          <ProgressBar sx={{ flexGrow: 6 }} />
          <VolumeControl sx={{ flexGrow: 2 }} />
          <PlaylistControl playlistViewMode="popover" />
        </>
      ) : null}
    </RowBox>
  );

  const columnView = () => (
    <ColumnBox>
      {/* grow and center cover art */}
      <CenterChildBox sx={{ flexGrow: 1 }}>
        <CoverArt
          className="children"
          src={playlist[currentTrack].coverArt}
          sx={{
            height: "300px",
            width: "300px",
          }}
        />
        <TrackDetails
          sx={{
            mt: 1,
            textAlign: "center",
          }}
        />
      </CenterChildBox>
      <ProgressBar />
      <Controls />
      <VolumeControl />
      <PlaylistControl playlistViewMode="expand" />
    </ColumnBox>
  );

  const rootRef = React.useRef();
  // set resize listeners
  useEffect(() => {
    const rootElement = rootRef.current;
    const setLargeOnCondition = (condition) => {
      if (condition) {
        if (!isLarge) setLarge(true);
      } else {
        if (isLarge) {
          setLarge(false);
          // incase maximised before resize
          if (maximised) setMaximised(false);
        }
      }
    };

    // set large if root size is medium or bigger
    setLargeOnCondition(rootElement.clientWidth > theme.breakpoints.values.md);

    if (docked) {
      // manually perform media query
      window.addEventListener("resize", () => {
        setLargeOnCondition(window.innerWidth > theme.breakpoints.values.md);
      });
      return () => {
        window.addEventListener("resize", null);
      };
    }
  });

  return (
    // sx from props can be used to override default styles in rowView
    <RootPaper
      ref={rootRef}
      sx={{
        width: docked ? "100vw" : "auto",
        // positioning
        position: docked ? "absolute" : "static",
        bottom: docked ? 0 : null,
        bgcolor: "background.paper",
        ...sx,
      }}
    >
      {/* render row view only when not maximised*/}
      {maximised ? null : rowView()}

      <SwipeableDrawer
        elevation={1}
        open={maximised}
        anchor="bottom"
        onClose={closeSwipeableDrawer}
        onOpen={openSwipeableDrawer}
      >
        <SwipeableDrawerRoot>
          <Box
            className={`${PREFIX}-swipeable-puller`}
            onClick={closeSwipeableDrawer}
          />
          {columnView()}
        </SwipeableDrawerRoot>
      </SwipeableDrawer>
    </RootPaper>
  );
}
