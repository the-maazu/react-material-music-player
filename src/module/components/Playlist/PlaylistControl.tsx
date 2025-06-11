import * as React from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import actionCreators from "../../redux/actionCreators";
import ShuffleRounded from "@mui/icons-material/ShuffleRounded";
import ShuffleOnRounded from "@mui/icons-material/ShuffleOnRounded";
import QueueMusicRounded from "@mui/icons-material/QueueMusicRounded";
import RepeatRounded from "@mui/icons-material/RepeatRounded";
import RepeatOnRounded from "@mui/icons-material/RepeatOnRounded";
import RepeatOneOnRounded from "@mui/icons-material/RepeatOneOnRounded";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Popover from "@mui/material/Popover";
import ToggleButton from "@mui/material/ToggleButton";
import { styled, SxProps } from "@mui/material/styles";
import { RootState } from "../../redux/store";
import Playlist from "./Playlist";
import { RepeatMode } from "../../redux/types";

const classes = {
  button: "PlaylistControl-button",
};

const RootBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "center",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",

  [`& .${classes.button}`]: {
    // space buttons horizontally
    margin: `auto ${theme.spacing(1)}`,
    flexGrow: 1, // buttons should grow
  },
}));

interface RepeatButtonProps {
  value: "NORMAL" | "REPEAT_ALL" | "REPEAT_ONE";
  className?: string;
  onClick?: () => void;
}

const RepeatButton = (props: RepeatButtonProps) => {
  const { value, ...other } = props;

  return (
    <ToggleButton
      value="repeat"
      selected={value !== RepeatMode.NORMAL}
      {...other}
    >
      {value === RepeatMode.NORMAL ? (
        <RepeatRounded />
      ) : value === RepeatMode.REPEAT_ALL ? (
        <RepeatOnRounded />
      ) : (
        <RepeatOneOnRounded />
      )}
    </ToggleButton>
  );
};

interface ShuffleButtonProps {
  value: boolean;
  className?: string;
  onClick?: () => void;
}

const ShuffleButton = (props: ShuffleButtonProps) => {
  const { value, ...other } = props;

  return (
    <ToggleButton value="shuffle" selected={value} {...other}>
      {value ? <ShuffleOnRounded /> : <ShuffleRounded />}
    </ToggleButton>
  );
};

interface PlaylistControlProps {
  sx?: SxProps;
  playlistViewMode: "popover" | "collapse";
}

export default function PlaylistControl(props: PlaylistControlProps) {
  const sx = props.sx;
  const playlistViewMode = props.playlistViewMode;

  const shuffled = useSelector<RootState, boolean>((state) => state.shuffled);
  const repeatMode = useSelector<
    RootStateOrAny,
    "NORMAL" | "REPEAT_ALL" | "REPEAT_ONE"
  >((state) => state.repeatMode);
  const [playlistVisible, showPlaylist] = React.useState<boolean>(false);
  const [anchorEl, setAnchor] = React.useState<HTMLElement | null>(null);

  const dispatch = useDispatch();
  const onShuffle = (bool: boolean) => dispatch(actionCreators.shuffle(bool));
  const onRepeat = (mode: string) =>
    dispatch(actionCreators.setRepeatMode(mode));

  const handlePopoverClose = () => {
    showPlaylist(false);
    setAnchor(null);
  };

  return (
    <RootBox sx={{ ...sx }}>
      <ButtonContainer>
        <RepeatButton
          value={repeatMode}
          className={classes.button}
          onClick={() => {
            switch (repeatMode) {
              case RepeatMode.NORMAL:
                return onRepeat(RepeatMode.REPEAT_ALL);
              case RepeatMode.REPEAT_ALL:
                return onRepeat(RepeatMode.REPEAT_ONE);
              case RepeatMode.REPEAT_ONE:
                return onRepeat(RepeatMode.NORMAL);
              default:
                return repeatMode;
            }
          }}
        />
        <ShuffleButton
          value={shuffled}
          className={classes.button}
          onClick={() => {
            onShuffle(!shuffled);
          }}
        />
        <ToggleButton
          className={classes.button}
          value="show playlist"
          selected={playlistVisible}
          onChange={(e) => {
            setAnchor(
              (e.target as HTMLElement).parentElement?.parentElement
                ?.parentElement?.parentElement || null
            );
            showPlaylist(!playlistVisible);
          }}
        >
          <QueueMusicRounded />
        </ToggleButton>
      </ButtonContainer>

      {playlistViewMode === "popover" ? (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          sx={{ boxShadow: 8 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Playlist
            sx={{
              width: "400px",
              height: "60vh",
            }}
          />
        </Popover>
      ) : (
        <Collapse collapsedSize={"0"} in={playlistVisible}>
          <Playlist
            sx={{
              height: "40vh",
              width: "90vw",
              overflow: "scroll",
            }}
          />
        </Collapse>
      )}
    </RootBox>
  );
}
