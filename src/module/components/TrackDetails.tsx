import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";

const Root = styled(Box, {
  name: "MuiMusicPlayer",
  slot: "trackDetails"
})();

interface TrackDetailsProps {
  sx: SxProps;
}

const TrackDetails = (props: TrackDetailsProps) => {
  const { title, artist } = useSelector<any, any>(
    (state) => {
      let currentTrack = state.playlist[state.currentTrack];
      return {
        title: currentTrack?.title,
        artist: currentTrack?.artist
      };
    },
    shallowEqual
  );

  return (
    <Root sx={ props.sx }>
      <Box
        sx={ {
          typography: "subtitl3",
          whiteSpace: "nowrap",
          overflow: "hidden"
        } }
      >
        { title }
      </Box>
      <Box
        sx={ {
          typography: "subtitle2",
          whiteSpace: "nowrap",
          overflow: "hidden"
        } }
      >
        { artist }
      </Box>
    </Root>
  );
};

export default TrackDetails;
