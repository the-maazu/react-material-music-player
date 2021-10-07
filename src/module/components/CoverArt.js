import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledImg = styled("img")(() => ({
  height: "100%",
  width: "100%",
  border: "0px",
}));

export default function CoverArt(props) {
  const { src, sx } = props;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        ...sx,
      }}
    >
      <StyledImg src={src} alt={""} />
    </Box>
  );
}
