import React from "react";

import PropTypes from "prop-types";

import {
  PlayArrowRounded as PlayIcon,
  Menu as ReorderIcon,
} from "@mui/icons-material/";
import Box from "@mui/material/Box";

import CoverArt from "../CoverArt";
import withoutPropagation from "../../utils/withoutPropagation";

class PlaylistItemTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { item, dragHandleProps, commonProps, itemSelected } = this.props;

    return (
      <Box
        sx={{
          maxHeight: "100%", // requirement for best results
          // flex box
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "nowrap",
          // border
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          // paddding
          boxSizing: "border-box",
          padding: 0.5,
          // elvate when selected
          boxShadow: itemSelected > 0 ? 16 : 0,
        }}
        onClick={withoutPropagation(
          commonProps.onTrackSelect,
          commonProps.listOfID.findIndex((ID) => ID === item.ID)
        )}
      >
        {/*render now playing icon or empty box matching icon size */}
        {commonProps.currentTrackID === item.ID ? (
          <PlayIcon />
        ) : (
          <Box sx={{ width: "24px", height: "24px" }} />
        )}

        <CoverArt
          src={item.coverArt}
          sx={{
            height: "48px",
            width: "48px",
          }}
        />

        <Box sx={{ flexGrow: 1, mx: 1 }}>
          <Box sx={{ typography: "subtitl3" }}>{item.title}</Box>
          <Box sx={{ typography: "subtitle2" }}>{item.artist}</Box>
        </Box>

        <ReorderIcon
          item
          {...dragHandleProps}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </Box>
    );
  }
}

PlaylistItemTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default PlaylistItemTemplate;
