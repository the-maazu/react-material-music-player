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
  width: "100vw",
  // positioning
  position: "fixed",
  bottom: 0,
  // prevent screen size overflow by making padding part of dimensions
  boxSizing: "border-box",
  borderRadius: `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0`,
  // only pad left and right; top padding too much
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  // incase of overflow in undocked mode
  overflow: "hidden",
  transition: theme.transitions.create(["all"]),
}));

const SwipeableDrawerRoot = styled(Box)(({ theme }) => ({
  // fixed size root for swipeable
  // width including padding
  // boxSizing: "border-box",
  height: "80vh",
  marginTop: theme.spacing(6),
  padding: theme.spacing(1),
  overflow: "hidden",

  // puller to be positioned middle of the parent's border
  [`& > .${PREFIX}-swipeable-puller`]: {
    width: 30,
    height: theme.spacing(1),
    backgroundColor: theme.palette.action.disabled, // button color
    borderRadius: 3,
    // position
    position: "absolute",
    top: theme.spacing(3), // center in parent border
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

//create your forceUpdate hook
function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function Player(props) {
  const sx = props.sx;
  const disableDrawer = props.disableDrawer;

  const theme = useTheme();

  const [maximised, setMaximised] = useState(false);
  const [isLarge, setLarge] = useState(false);
  const forceUpdate = useForceUpdate();

  const { currentTrack, playlist } = useSelector(
    /** @type {import("../redux/types.js").useSelectCb} */
    ({ currentTrack, playlist }) => ({
      currentTrack,
      playlist,
    }),
    shallowEqual
  );

  const openSwipeableDrawer = () => {
    // only maximise if docked and not large
    if (!disableDrawer && !isLarge) {
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
            boxShadow: 4,
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

  // set large depending on player width
  const rootRef = React.useRef();
  // eslint-disable-next-line
  useEffect(() => {
    /**
     * Root of the player
     * @type {Element}
     * */
    const rootElement = rootRef.current;
    if (rootElement.clientWidth > theme.breakpoints.values.md) {
      if (!isLarge) setLarge(true);
    } else {
      if (isLarge) {
        setLarge(false);
        // incase maximised before resize
        if (maximised) setMaximised(false);
      }
    }
  });

  // also set window resize listener
  useEffect(() => {
    window.onresize = () => {
      forceUpdate();
    };
    // eslint-disable-next-line
  }, []);

  return (
    // sx from props can be used to override default styles in rowView
    <RootPaper ref={rootRef} sx={sx} elevation={4}>
      {/* render row view only when not maximised*/}
      {maximised ? null : rowView()}

      {!disableDrawer && !isLarge && (
        <SwipeableDrawer
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
      )}
    </RootPaper>
  );
}
