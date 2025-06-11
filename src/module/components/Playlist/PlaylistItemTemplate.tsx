import * as React from "react";
import {
  PlayArrowRounded as PlayIcon,
  Menu as ReorderIcon
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import { ITrack } from "../../redux/types";
import CoverArt from "../CoverArt";
import withoutPropagation from "../../utils/withoutPropagation";
import { CommonProps } from "./Playlist";

export interface PlaylistItemTemplateProps {
  item: ITrack;
  dragHandleProps?: any;
  commonProps: CommonProps;
  itemSelected: number;
}

const PlaylistItemTemplate = ({ item, dragHandleProps, commonProps, itemSelected }: PlaylistItemTemplateProps) => {
  const handleSelect = (): void => {
    commonProps.onTrackSelect(commonProps.listOfID.indexOf(item.ID));
  };

  return (
    <Box
      sx={ {
        maxHeight: "100%", // requirement for best results
        // flex box
        display: "flex",
        flexDirection: "row",
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
        boxShadow: itemSelected > 0 ? 16 : 0
      } }
    >
      <Box
        sx={ { display: "flex", flexGrow: 1, alignItems: "center" } }
        onClick={ withoutPropagation(handleSelect) }
      >
        {/*render now playing icon or empty box matching icon size */ }
        { commonProps.currentTrackID === item.ID ? (
          <PlayIcon />
        ) : (
          <Box sx={ { width: "24px", height: "24px" } } />
        ) }
        <CoverArt
          alt={ item.title }
          src={ item.coverArt }
          sx={ {
            height: "48px",
            width: "48px"
          } }
        />

        <Box sx={ { width: "50px", flexGrow: 1, flexShrink: 1, mx: 1 } }>
          <Box
            sx={ {
              width: "100%",
              typography: "subtitl3",
              whiteSpace: "nowrap",
              overflow: "hidden"
            } }
          >
            { item.title }
          </Box>
          <Box
            sx={ {
              width: "100%",
              typography: "subtitle2",
              whiteSpace: "nowrap",
              overflow: "hidden"
            } }
          >
            { item.artist }
          </Box>
        </Box>
      </Box>
      <ReorderIcon
        sx={ { mx: 1 } }
        { ...dragHandleProps }
        onClick={ (e: React.MouseEvent) => {
          e.stopPropagation();
        } }
      />
    </Box>
  );
};

export default PlaylistItemTemplate;
