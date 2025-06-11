import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled, SxProps } from "@mui/system";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Controls from "./Controls";
import CoverArt from "./CoverArt";
import PlaylistControl from "./Playlist/PlaylistControl";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";
import TrackDetails from "./TrackDetails";
import VolumeControl from "./VolumeControl";
import debounce from "@mui/utils/debounce";

const PREFIX = "Player";

const RootPaper = styled(Paper, {
  name: "MuiMusicPlayer",
  slot: "root"
})(({ theme }) => ({
  width: "100vw",
  position: "fixed",
  bottom: 0,
  boxSizing: "border-box",
  borderRadius: 0,
  overflow: "hidden",
  transition: (theme.transitions as any).create(["all"]),
  zIndex: 1500
}));

const SwipeableDrawerRoot = styled(Box)(({ theme }) => ({
  height: "80vh",
  marginTop: theme.spacing(6),
  padding: theme.spacing(1),
  overflow: "hidden",

  // puller to be positioned middle of the parent's border
  [`& > .${ PREFIX }-swipeable-puller`]: {
    width: 30,
    height: theme.spacing(1),
    backgroundColor: theme.palette.action.disabled, // button color
    borderRadius: 3,
    // position
    position: "absolute",
    top: theme.spacing(3), // center in parent border
    left: "calc(50% - 15px)" // center horizontally
  }
}));

const RowBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "nowrap"
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
  flexWrap: "nowrap"
}));

// box center child
const CenterChildBox = styled(Box)(() => ({
  // flexbox
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "nowrap"
}));

export interface PlayerProps extends Pick<ProgressBarProps, "displayTrackDuration"> {
  sx?: SxProps;
  disableDrawer?: boolean;
  defaultArt?: string;
}

const Player = (props: PlayerProps) => {
  const theme = useTheme();
  const [maximised, setMaximised] = React.useState<boolean>(false);
  const [width, setWidth] = React.useState<number>(globalThis.innerWidth);

  const { currentTrack, playlist } = useSelector<any, any>(
    ({ currentTrack, playlist }) => ({
      currentTrack,
      playlist
    }),
    shallowEqual
  );

  const openSwipeableDrawer = () => {
    // only maximise if docked and not large
    if (!props.disableDrawer && width < theme.breakpoints.values.md) {
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
    <RowBox onClick={ openSwipeableDrawer }>
      <CoverArt
        alt={ playlist[currentTrack]?.title as string }
        src={ playlist[currentTrack]?.coverArt ?? props.defaultArt }
      />
      <TrackDetails
        sx={ {
          // fixed size to stop resize on content change
          width: "120px",
          flexGrow: 1,
          textAlign: "left",
          marginLeft: 1,
          marginRight: 1,
          flexShrink: 0
        } }
      />
      <Controls
        disabled={ playlist[currentTrack] === undefined }
        isSmall={ width <= theme.breakpoints.values.sm }
      />
      { width > theme.breakpoints.values.md && (
        <React.Fragment>
          <ProgressBar sx={ { flexGrow: 6 } } displayTrackDuration={ props.displayTrackDuration } />
          <VolumeControl sx={ { flexGrow: 2 } } />
          <PlaylistControl playlistViewMode="popover" />
        </React.Fragment>
      ) }
    </RowBox>
  );

  const columnView = () => (
    <ColumnBox>
      {/* grow and center cover art */ }
      <CenterChildBox sx={ { flexGrow: 1 } }>
        <CoverArt
          alt={ playlist[currentTrack]?.title as string }
          src={ playlist[currentTrack]?.coverArt ?? props.defaultArt }
          height={ 300 }
          width={ 300 }
          sx={ { boxShadow: 4 } }
        />
        <TrackDetails
          sx={ {
            mt: 1,
            textAlign: "center"
          } }
        />
      </CenterChildBox>
      <ProgressBar displayTrackDuration={ props.displayTrackDuration } />
      <Controls disabled={ playlist[currentTrack] === undefined } />
      <VolumeControl />
      <PlaylistControl playlistViewMode="collapse" />
    </ColumnBox>
  );

  // set large depending on player width
  const rootRef = React.useRef<HTMLDivElement>(null);
  const widthSetter = debounce(
    () => {
      const rootElement = rootRef.current;
      setWidth(rootElement?.clientWidth ?? width);
    },
    250
  );

  // windows resize listener
  React.useEffect(() => {
    widthSetter();
    window.addEventListener("resize", widthSetter);
    // eslint-disable-next-line
  }, []);

  // after every render
  React.useEffect(() => {
    widthSetter();
  });

  // close maximised drawer when view port gets large
  React.useEffect(() => {
    if (width > theme.breakpoints.values.lg) setMaximised(false);
    // eslint-disable-next-line
  }, [width]);

  return (
    // sx from props can be used to override default styles in rowView
    <RootPaper ref={ rootRef } sx={ props.sx } elevation={ 4 }>
      { 0 !== playlist.length && (
        <Box p={ 1 }>
          {/* render row view only when not maximised*/ }
          { maximised ? null : rowView() }

          { !props.disableDrawer && width <= theme.breakpoints.values.md && (
            <SwipeableDrawer
              open={ maximised }
              anchor="bottom"
              onClose={ closeSwipeableDrawer }
              onOpen={ openSwipeableDrawer }
            >
              <SwipeableDrawerRoot>
                <Box
                  className={ `${ PREFIX }-swipeable-puller` }
                  onClick={ closeSwipeableDrawer }
                />
                { columnView() }
              </SwipeableDrawerRoot>
            </SwipeableDrawer>
          ) }
        </Box>
      ) }
    </RootPaper>
  );
};

export default Player;
