import React, { useState, useEffect } from "react";

import { useSelector, shallowEqual } from "react-redux";

import { useTheme, styled } from "@mui/material/styles";
import { Box, SwipeableDrawer, Paper } from "@mui/material";

import debounce from "lodash.debounce";

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

export default function Player(props) {
  const sx = props.sx;
  const disableDrawer = props.disableDrawer;
  const defaultArt = props.defaultArt;

  const theme = useTheme();

  const [maximised, setMaximised] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

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
    if (!disableDrawer && width < theme.breakpoints.values.md) {
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
        src={playlist[currentTrack]?.coverArt ?? defaultArt}
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
          flexGrow: 1,
          textAlign: "left",
          margin: 1,
          flexShrink: 0,
        }}
      />
      <Controls
        disabled={playlist[currentTrack] === undefined}
        isSmall={width <= theme.breakpoints.values.sm}
      />
      {width > theme.breakpoints.values.md && (
        <>
          <ProgressBar sx={{ flexGrow: 6 }} />
          <VolumeControl sx={{ flexGrow: 2 }} />
          <PlaylistControl playlistViewMode="popover" />
        </>
      )}
    </RowBox>
  );

  const columnView = () => (
    <ColumnBox>
      {/* grow and center cover art */}
      <CenterChildBox sx={{ flexGrow: 1 }}>
        <CoverArt
          className="children"
          src={playlist[currentTrack]?.coverArt ?? defaultArt}
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
      <Controls disabled={playlist[currentTrack] === undefined} />
      <VolumeControl />
      <PlaylistControl playlistViewMode="expand" />
    </ColumnBox>
  );

  // set large depending on player width
  const rootRef = React.useRef();
  const widthSetter = debounce(
    () => {
      /**
       * Root of the player
       * @type {Element}
       * */
      const rootElement = rootRef.current;
      setWidth(rootElement.clientWidth ?? width);
    },
    250,
    { maxWait: 1000 }
  );

  // windows resize listener
  useEffect(() => {
    widthSetter();
    window.addEventListener("resize", widthSetter);
    // eslint-disable-next-line
  }, []);

  // after every render
  useEffect(() => {
    widthSetter();
  });

  // close maximised drawer when view port gets large
  useEffect(() => {
    if (width > theme.breakpoints.values.lg) setMaximised(false);
    // eslint-disable-next-line
  }, [width]);

  return (
    // sx from props can be used to override default styles in rowView
    <RootPaper ref={rootRef} sx={sx} elevation={4}>
      {/* render row view only when not maximised*/}
      {maximised ? null : rowView()}

      {!disableDrawer && width <= theme.breakpoints.values.md && (
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
