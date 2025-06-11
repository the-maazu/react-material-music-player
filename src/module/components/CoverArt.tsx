import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styled, SxProps } from "@mui/system";
import * as React from "react";

const Root = styled(Box, {
  name: "MuiMusicPlayer",
  slot: "coverArt"
})(({ theme }) => ({
  border: 1,
  borderColor: theme.palette.divider,
  borderRadius: 2,
  overflow: "hidden",
  position: "relative"
}));

interface CoverArtProps {
  src: string | undefined;
  alt: string;
  sx?: SxProps;
  height?: number;
  width?: number;
}

const CoverArt = (props: CoverArtProps) => {
  const { height = 48, width = 48, ...rest } = props;

  return (
    <Root sx={ { height, width, ...rest.sx } }>
      <Avatar
        src={ rest.src }
        alt={ rest.alt }
        sx={ { width, height } }
        variant="rounded"
      />
    </Root>
  );
};

export default CoverArt;
