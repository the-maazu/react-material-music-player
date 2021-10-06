import { createTheme, alpha } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

export default function getTheme(mode) {
  // define light palette for light mode
  const lightPalette = {
    primary: { main: "#007FFF" },
    secondary: { main: "#9c27b0" },
    divider: "#E5E8EC",
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
    },
    text: {
      disabled: "rgba(0, 0, 0, 0.38)",
      icon: "rgba(255, 255, 255, 0.5)",
      primary: "#20262D",
      secondary: "#2F3A45",
    },
  };

  // define light palette for dark mode
  let darkPalette = {
    primary: { main: "#5090D3" },
    secondary: { main: "#ce93d8" },
    background: {
      paper: "#0A1929",
    },
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
    },
    text: {
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
      primary: "#fff",
      secondary: "#AAB4BE",
    },
  };

  // create a new theme with right palette based on mode
  // this theme object can then be referenced when overriding components
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightPalette : darkPalette),
    },
  });

  // create component overrieds for dark mode
  let darkComponents = {
    MuiSlider: {
      styleOverrides: {
        // some csss
        root: {
          color: "white",
        },
        thumb: {
          color: "white",
          width: 8,
          height: 8,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        },
      },
    },
  };

  // create components overrides for light mode
  let lightComponents = {
    MuiIconButton: {
      defaultProps: {
        color: "primary",
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {
          color: "black",
        },
        thumb: {
          color: "gray",
        },
      },
    },
  };

  // create common components overrides for both modes
  let commonStyleOverrides = {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px 10px 0 0",
          // make background transparent by reapplying theme background paper
          // alpha is a convinience function for generating css color string with alpha channel
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(40px)",
        },
      },
    },
    MuiToggleButton: {
      defaultProps: {
        color: "primary",
      },
    },

    MuiSlider: {
      styleOverrides: {
        thumb: {
          width: 8,
          height: 8,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&:before": {
            boxShadow: "0 2px 1px 0 rgba(0,0,0,0.4)",
          },
          ":hover, &.Mui-focusVisible": {
            height: 15,
            width: 15,
            boxShadow: "0px 0px 0px 8px rgb(0 0 0 / 16%)",
          },
          "&.Mui-active": {
            width: 20,
            height: 20,
          },
        },
      },
    },
  };

  // deepmerge common styles overrides with light or dark components overrides depending on mode
  let mergedComponentStyles =
    mode === "light"
      ? deepmerge(
          { components: commonStyleOverrides },
          { components: lightComponents }
        )
      : deepmerge(
          { components: commonStyleOverrides },
          { components: darkComponents }
        );

  // create
  return createTheme(theme, mergedComponentStyles);
}
