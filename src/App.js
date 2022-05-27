import React from "react";
import logo from "./logo.svg";
import "./App.css";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  TextField,
  Link,
} from "@mui/material";
import {
  LightModeRounded,
  ComputerRounded,
  DarkModeRounded,
} from "@mui/icons-material";

// To use the player this is what you need to import
import Player, {
  TrackModel,
  PlayerInterface,
  RepeatModes,
} from "./module/index.js";

import makeTheme from "./makeTheme";

function App() {
  const [mode, setMode] = React.useState("system");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = makeTheme(
    mode === "system" ? (isDark ? "dark" : "light") : mode
  );

  const [
    {
      width,
      position,
      bottom,
      boxShadow,
      borderRadiusTL,
      borderRadiusTR,
      borderRadiusBL,
      borderRadiusBR,
    },
    setSx,
  ] = React.useState({
    width: "100vw",
    position: "fixed",
    bottom: 0,
    boxShadow: 8,
    borderRadiusTL: 1,
    borderRadiusTR: 1,
    borderRadiusBL: 0,
    borderRadiusBR: 0,
  });

  const handleForm = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setSx({
      width,
      position,
      bottom,
      boxShadow,
      borderRadiusTL,
      borderRadiusTR,
      borderRadiusBL,
      borderRadiusBR,
      [`${id}`]: value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "text.primary",
          textAlign: "center",
        }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <Box sx={{ typography: "h6" }}>react-material-music-player</Box>

        <div>
          <Link
            href="https://www.npmjs.com/package/react-material-music-player"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </Link>
          <br />
          <Link
            href="https://github.com/the-maazu/react-material-music-player"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </Link>
          <br />
          <Link
            href="https://liberapay.com/the-maazu/donate"
            target="_blank"
            rel="noopener noreferrer"
          >
            donate
          </Link>
        </div>

        <Box sx={{ typography: "body3", margin: 2 }}>
          Resize window to eneter mobile mode. <br />
          Swipe up or tap player to expand in mobile mode
        </Box>

        <ToggleButtonGroup
          value={mode}
          exclusive={true}
          onChange={(e, value) => {
            if (value) setMode(value);
          }}
        >
          <ToggleButton value={"light"}>
            <LightModeRounded />
          </ToggleButton>
          <ToggleButton value={"system"}>
            <ComputerRounded />
          </ToggleButton>
          <ToggleButton value={"dark"}>
            <DarkModeRounded />
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ display: "flex", margin: 2 }}>
          <Box sx={{ margin: 1 }}>
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="width"
              label="width"
              value={width}
              onChange={handleForm}
            />
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="position"
              label="position"
              value={position}
              onChange={handleForm}
              type="text"
            />
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="bottom"
              label="bottom"
              value={bottom}
              onChange={handleForm}
              type="text"
            />
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="boxShadow"
              label="boxShadow"
              value={boxShadow}
              onChange={handleForm}
              type="number"
            />
          </Box>

          <Box sx={{ margin: 1 }}>
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="borderRadiusTL"
              label="borderRadiusTL"
              value={borderRadiusTL}
              onChange={handleForm}
              type="number"
            />
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="borderRadiusTR"
              label="borderRadiusTR"
              value={borderRadiusTR}
              onChange={handleForm}
              type="number"
            />
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="borderRadiusBL"
              label="borderRadiusBL"
              value={borderRadiusBL}
              onChange={handleForm}
              type="number"
            />
            <TextField
              sx={{ display: "block" }}
              margin={"dense"}
              size="small"
              id="borderRadiusBR"
              label="borderRadiusBR"
              value={borderRadiusBR}
              onChange={handleForm}
              type="number"
            />
          </Box>
        </Box>

        <Player
          // disableDrawer
          sx={{
            width: width,
            position: position,
            bottom: bottom,
            boxShadow: boxShadow,
            borderRadius: `${borderRadiusTL}px ${borderRadiusTR}px ${borderRadiusBL}px ${borderRadiusBR}px`,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

// get media data over tthe internet
const TEST_MEDIA =
  "https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/sample_media/";

// update playlist with test data and start play
PlayerInterface.setPlaylist([
  new TrackModel(
    "1",
    TEST_MEDIA + "bach.jpg",
    "68 Choral",
    "Bach",
    TEST_MEDIA + "Bach%20--%20BWV%20245%20--%2068%20Choral.mp3"
  ),
]);

// wait 3 seconds
window.setTimeout(
  () =>
    // adds music at end of playlist
    PlayerInterface.playLater([
      new TrackModel(
        "2",
        TEST_MEDIA + "emerson.jpeg",
        "All through the night",
        "Emerson",
        TEST_MEDIA +
          "Emerson%20--%20All%20through%20the%20Night%20(Ar%20Hyd%20y%20Nos).mp3"
      ),
    ]),
  3000 // 3 seconds
);

// wait 6 seconds
window.setTimeout(
  () =>
    // add music after current track
    PlayerInterface.playNext([
      new TrackModel(
        "3",
        TEST_MEDIA + "guido.jpg",
        "Ut queant laxis",
        "Guido von Arezzo",
        TEST_MEDIA + "Guido%20von%20Arezzo%20--%20Ut%20queant%20laxis.mp3"
      ),
    ]),
  6000 // 6 seconds
);

window.setTimeout(
  () =>
    // add music after current track
    PlayerInterface.play(),
  9000 // 8 seconds
);

window.setTimeout(
  () =>
    // add music after current track
    PlayerInterface.setRepeatMode(RepeatModes.REPEAT_ONE),
  12000 // 8 seconds
);

window.setTimeout(
  () =>
    // add music after current track
    PlayerInterface.setRepeatMode(RepeatModes.REPEAT_ALL),
  15000 // 8 seconds
);

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.pause(),
//   12000 // 7 seconds
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.stop(),
//   15000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.setVolume(100),
//   18000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.skipNext(),
//   21000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.skipPrev(),
//   24000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.shuffle(true),
//   27000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.shuffle(false),
//   30000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.changeTrack(2),
//   33000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.play(),
//   36000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.seek(50),
//   39000
// );

// window.setTimeout(
//   () =>
//     // add music after current track
//     PlayerInterface.clearPlaylist(),
//   42000
// );

export default App;
