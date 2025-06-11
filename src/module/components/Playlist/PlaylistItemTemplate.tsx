import { useSortable } from "@dnd-kit/react/sortable";
import * as React from "react";
import {
  PlayArrowRounded as PlayIcon,
  Menu as ReorderIcon,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import { ITrack } from "../../redux/types";
import CoverArt from "../CoverArt";
import withoutPropagation from "../../utils/withoutPropagation";
import { CommonProps } from "./Playlist";

export interface PlaylistItemTemplateProps {
  index: number;
  item: ITrack;
  commonProps: CommonProps;
  itemSelected: number;
}

const PlaylistItemTemplate = (props: PlaylistItemTemplateProps) => {
  const { ref } = useSortable({ id: props.item.id, index: props.index });

  const handleSelect = (): void => {
    props.commonProps.onTrackSelect(
      props.commonProps.listOfID.indexOf(props.item.id)
    );
  };

  return (
    <Box
      ref={ref}
      sx={{
        maxHeight: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        boxSizing: "border-box",
        padding: 0.5,
        boxShadow: props.itemSelected > 0 ? 16 : 0,
      }}
    >
      <Box
        sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}
        onClick={withoutPropagation(handleSelect)}
      >
        {/*render now playing icon or empty box matching icon size */}
        {props.commonProps.currentTrackID === props.item.id ? (
          <PlayIcon />
        ) : (
          <Box sx={{ width: "24px", height: "24px" }} />
        )}
        <CoverArt
          alt={props.item.title}
          src={props.item.coverArt}
          sx={{
            height: "48px",
            width: "48px",
          }}
        />

        <Box sx={{ width: "50px", flexGrow: 1, flexShrink: 1, mx: 1 }}>
          <Box
            sx={{
              width: "100%",
              typography: "subtitl3",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {props.item.title}
          </Box>
          <Box
            sx={{
              width: "100%",
              typography: "subtitle2",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {props.item.artist}
          </Box>
        </Box>
      </Box>
      <ReorderIcon sx={{ mx: 1 }} />
    </Box>
  );
};

export default PlaylistItemTemplate;
