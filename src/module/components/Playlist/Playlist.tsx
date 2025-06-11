import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Button, Stack, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ModalProps } from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ActionCreators from "../../redux/actionCreators";
import { ITrack } from "../../redux/types";
import PlaylistItemTemplate from "./PlaylistItemTemplate";
import { Close } from "@mui/icons-material";

const Root = styled(Box, {
  name: "MuiMusicPlayer",
  slot: "playlist",
})(({ theme }) => ({
  margin: theme.spacing(),
  width: "10vw",
  height: "10vh",
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

type State = {
  playlist: ITrack[];
  currentTrack: number;
};

const Playlist = (props: PlaylistProps) => {
  const dispatch = useDispatch();
  const { playlist, currentTrack } = useSelector<State, State>(
    ({ playlist, currentTrack }) => ({
      playlist,
      currentTrack,
    }),
    shallowEqual
  );

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

  return (
    <Root sx={props.sx}>
      {props.onClose && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Playlist</Typography>
          <Box>
            <Button onClick={handleClearPlaylist}>Clear</Button>
            <IconButton
              onClick={(e) =>
                props.onClose && props.onClose(e, "backdropClick")
              }
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}
      <DragDropProvider
        onDragEnd={(event) => {
          dispatch(
            ActionCreators.updatePlaylist(
              move<ITrack[], any, any, any>(playlist, event)
            )
          );
        }}
      >
        <Stack spacing={1}>
          {playlist.map((item, index) => (
            <PlaylistItemTemplate
              key={item.id}
              item={item}
              index={index}
              itemSelected={currentTrack}
              commonProps={{
                listOfID: playlist.map((element) => element.id),
                currentTrackID: playlist[currentTrack]?.id,
                onTrackSelect,
                onTrackRemove,
              }}
            />
          ))}
        </Stack>
      </DragDropProvider>
    </Root>
  );
};

export default Playlist;
