import * as React from "react";
// @ts-ignore
import logo from "./logo.svg";
import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import ComputerRounded from "@mui/icons-material/ComputerRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";

// To use the player this is what you need to import
import Player, { PlayerInterface, Track } from "./module";

import makeTheme from "./makeTheme";

function App() {
  const [mode, setMode] = React.useState("system");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = makeTheme(
    mode === "system" ? (isDark ? "dark" : "light") : (mode as "light" | "dark")
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

  const handleForm = (e: any) => {
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
        </div>

        <Box sx={{ typography: "body3", margin: 2 }}>
          Resize window for mobile mode. <br />
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
          defaultArt="https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/sample_media/bach.jpg"
        />
      </Box>
    </ThemeProvider>
  );
}

// get media data over tthe internet
const TEST_MEDIA =
  "https://github.com/the-maazu/react-material-music-player/raw/main/sample_media/";

// update playlist with test data and start play
PlayerInterface.setPlaylist([
  new Track({
    id: "1",
    coverArt: TEST_MEDIA + "bach.jpg",
    title: "68 Choral",
    artist: "Bach",
    source: TEST_MEDIA + "Bach%20--%20BWV%20245%20--%2068%20Choral.mp3",
  }),
  new Track({
    id: "2",
    coverArt: TEST_MEDIA + "emerson.jpeg",
    title: "All through the night",
    artist: "Emerson",
    source:
      TEST_MEDIA +
      "Emerson%20--%20All%20through%20the%20Night%20(Ar%20Hyd%20y%20Nos).mp3",
  }),
  new Track({
    id: "3",
    coverArt: TEST_MEDIA + "guido.jpg",
    title: "Ut queant laxis",
    artist: "Guido von Arezzo",
    source: TEST_MEDIA + "Guido%20von%20Arezzo%20--%20Ut%20queant%20laxis.mp3",
  }),
]);

export default App;
