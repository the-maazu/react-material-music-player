import React, { useState, useEffect } from "react";

import { useSelector, shallowEqual } from "react-redux";

import { useTheme, styled } from "@mui/material/styles";
import { Box, SwipeableDrawer } from "@mui/material";

import CoverArt from "./CoverArt.js";
import TrackDetails from "./TrackDetials.js";
import ProgressBar from "./ProgressBar.js";
import Controls from "./Controls.js";
import VolumeControl from "./VolumeControl.js";
import PlaylistControl from "./Playlist/PlaylistControl.js";

const PREFIX = "Player";

const RootBox = styled(Box)(({ theme }) => ({
  // prevent screen size overflow by making padding part of dimensions
  boxSizing: "border-box",
  // only pad left and right; top padding too much
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  // background
  backgroundColor: theme.palette.background.paper,
}));

const SwipeableDrawerRoot = styled(Box)(({ theme }) => ({
  // fixed size root for swipeable
  // width including padding
  // boxSizing: "border-box",
  height: "90vh",
  padding: theme.spacing(1),
  paddingTop: 0, // remove top padding in favor of top border
  // add border and make opaque
  borderTop: `${theme.spacing(3)} solid ${theme.palette.background.paper}`,
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
  flexDirection: "column-reverse",
  justifyContent: "space-between",
  alignItems: "stretch",
  flexWrap: "nowrap",
}));

export default function Player(props) {
  const sx = props.sx;
  const docked = props.docked === undefined ? true : props.docked;

  const theme = useTheme();
  const [maximised, setMaximised] = useState(false);
  const [isLarge, setLarge] = useState(true);

  const { currentTrack, playlist } = useSelector(
    ({ currentTrack, maximised, playlist }) => ({
      currentTrack,
      maximised,
      playlist,
    }),
    shallowEqual
  );

  const rowView = () => (
    <RowBox
      onClick={() => {
        // only maximise if docked and not large
        if (docked && !isLarge) {
          setMaximised(true);
        }
      }}
    >
      <CoverArt
        className="children"
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
          width: "192px",
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
      <PlaylistControl playlistViewMode="expand" />
      <VolumeControl />
      <Controls />
      <ProgressBar />
      <TrackDetails
        sx={{
          mt: 1,
          textAlign: "center",
        }}
      />
      <CoverArt
        className="children"
        src={playlist[currentTrack].coverArt}
        sx={{
          height: "300px",
          width: "300px",
          alignSelf: "center",
        }}
      />
    </ColumnBox>
  );

  // set large according to player size
  const rootRef = React.useRef();
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
    <RootBox
      ref={rootRef}
      sx={{
        width: docked ? "100vw" : "auto",
        height: docked ? "auto" : "auto",
        // positioning
        position: docked ? "absolute" : "static",
        bottom: docked ? 0 : null,
        ...sx,
      }}
    >
      {/* render row view only when not maximised*/}
      {maximised ? null : rowView()}

      <SwipeableDrawer
        open={maximised}
        anchor="bottom"
        onClose={() => {
          setMaximised(false);
        }}
      >
        <SwipeableDrawerRoot>
          <Box
            className={`${PREFIX}-swipeable-puller`}
            onClick={() => {
              setMaximised(false);
            }}
          />
          {columnView()}
        </SwipeableDrawerRoot>
      </SwipeableDrawer>
    </RootBox>
  );
}
