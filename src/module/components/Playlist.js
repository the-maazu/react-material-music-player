import React from "react";

import Box from "@mui/material/Box";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import actionCreators from "../redux/actionCreators.js";

import ReactDraggableList from "react-draggable-list";

import PlaylistItemTemplate from "./PlaylistItemTemplate.js";

export default function Playlist(props) {
  const sx = props.sx;

  const { playlist, currentTrack } = useSelector(
    ({ playlist, currentTrack }) => ({
      playlist,
      currentTrack,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const onReorder = (newList, newIndex) => {
    dispatch(actionCreators.updatePlaylist(newList));
    dispatch(actionCreators.changeTrack(newIndex));
  };
  const onTrackSelect = (index) => dispatch(actionCreators.changeTrack(index));

  const draggablelistContainerRef = React.createRef();
  return (
    <Box
      ref={draggablelistContainerRef}
      sx={{
        margin: (theme) => theme.spacing(),
        // require set container with fix size for draggable list
        width: "10vw",
        height: "10vh",
        ...sx, // should be able to overwrite default width and height
      }}
    >
      <ReactDraggableList
        list={playlist}
        itemKey="ID"
        template={PlaylistItemTemplate}
        onMoveEnd={(newList) => {
          onReorder(
            newList,
            newList.findIndex((track) => {
              return track.ID === playlist[currentTrack].ID;
            })
          );
        }}
        container={() => draggablelistContainerRef.current}
        commonProps={{
          listOfID: playlist.map((element) => element.ID),
          currentTrackID: playlist[currentTrack].ID,
          onTrackSelect: onTrackSelect,
        }}
      />
    </Box>
  );
}
