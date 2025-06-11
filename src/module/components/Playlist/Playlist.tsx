import { Button, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ModalProps } from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import * as React from "react";
import ReactDraggableList from "react-draggable-list";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ActionCreators from "../../redux/actionCreators";
import { ITrack } from "../../redux/types";
import PlaylistItemTemplate from "./PlaylistItemTemplate";
import { Close } from "@mui/icons-material";

const Root = styled(Box, {
  name: "MuiMusicPlayer",
  slot: "playlist"
})(({ theme }) => ({
  margin: theme.spacing(),
  width: "10vw",
  height: "10vh"
}));

export interface CommonProps {
  listOfID: string[];
  currentTrackID: string;
  onTrackSelect: (index: number) => void;
  onTrackRemove: (index: number) => void;
}

interface PlaylistProps {
  sx: SxProps;
  onClose?: ModalProps["onClose"];
}

const Playlist = (props: PlaylistProps) => {
  const dispatch = useDispatch();
  const { playlist, currentTrack } = useSelector<any, any>(
    ({ playlist, currentTrack }) => ({
      playlist,
      currentTrack
    }),
    shallowEqual
  );

  const handleReorder = (newList: any) => dispatch(ActionCreators.updatePlaylist(newList));

  const onTrackSelect = (index: number) => {
    // change and play track immediately
    dispatch(ActionCreators.changeTrack(index));
    dispatch(ActionCreators.play());
  };

  const onTrackRemove = (index: number) => {
    dispatch(ActionCreators.deleteTrack(index));
  };

  const handleClearPlaylist = () => {
    dispatch(ActionCreators.stop());
    dispatch(ActionCreators.changeTrack(0));
    dispatch(ActionCreators.updatePlaylist([]));
  };

  const draggablelistContainerRef = React.createRef();

  return (
    <Root
      ref={ draggablelistContainerRef }
      sx={ props.sx }
    >
      { props.onClose && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Playlist</Typography>
          <Box>
            <Button onClick={ handleClearPlaylist }>Clear</Button>
            <IconButton onClick={ (e) => props.onClose && props.onClose(e, "backdropClick") }>
              <Close />
            </IconButton>
          </Box>
        </Box>
      ) }
      { playlist.length > 0 ? (
        <ReactDraggableList<CommonProps, any, any>
          list={ playlist }
          itemKey="ID"
          template={ PlaylistItemTemplate as any }
          onMoveEnd={ handleReorder }
          container={ () => draggablelistContainerRef.current as HTMLElement }
          commonProps={ {
            listOfID: playlist.map((element?: ITrack) => element?.ID),
            currentTrackID: playlist[currentTrack]?.ID,
            onTrackSelect,
            onTrackRemove
          } }
        />
      ) : null }
    </Root>
  );
};

export default Playlist;
