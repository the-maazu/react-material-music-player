import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey {
    MuiMusicPlayer: "root" | "coverArt" | "progressBar" | "controls" | "trackDetails" | "volumeControl";
  }

  interface ComponentsPropsList {
    MuiMusicPlayer: Partial<StatProps>;
  }

  interface Components {
    MuiMusicPlayer?: {
      defaultProps?: ComponentsPropsList["MuiMusicPlayer"];
      styleOverrides?: ComponentsOverrides<Theme>["MuiMusicPlayer"];
      variants?: ComponentsVariants["MuiMusicPlayer"];
    };
  }
}
