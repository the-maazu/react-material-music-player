## The Player

This is a highly customisable music player powered by [mui-v5](https://mui.com).

Live [demo here](https://the-maazu.github.io/react-material-music-player/)

## features

- Highly customisable.
- Reorderable playlist.
- Media session action & metadata.
- Mobile mode drawer.

[Release notes](https://github.com/the-maazu/react-material-music-player/releases)

## installation

1.  npm install react-material-music-player

2.  <code>import [Player](https://github.com/the-maazu/react-material-music-player/blob/master/src/module/components/Player.js) from 'react-material-music-player' // default export</code>

3.  <code>import { [Track](https://github.com/the-maazu/react-material-music-player/tree/master/src/module/redux/types.js), [PlayerInterface](https://github.com/the-maazu/react-material-music-player/blob/master/src/module/interface.js) } from 'react-material-music-player'</code>

## usage

### the component

<code>&lt;Player sx={{...CSS-in-JS}} disableDrawer={tue|false}/&gt;</code>

- <code>sx(object)</code>: This is a superset of CSS introduced with mui-v5. You can override the default styles using this prop. It is possible to nest pseudo-selectors and target children components too(:hover, & > \*, etc). Default style is set to dock player at bottom of viewport <code>{width:"100vw", position:"fixed", bottom:0 ...}</code>. This can be overriden to position the Player anyway in your app. Read more on [the sx prop](https://mui.com/system/the-sx-prop/). [Demo](https://the-maazu.github.io/react-material-music-player/) allows you to modify just a few properties. Try them out!

- <code>disableDrawer(bool)</code>: Mobile drawer is activated when player is too small to contain all the controls. It is likely you would want this feature disabled if you render the Player in the normal document flow or want to use Player as widget in your app.

### the interface

1.  create tracks:
<pre><code>
new Track( 
    ID: string, // unique ID used in shuffling and sorting
    coverArt: <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/src">string</a>,
    title: string,
    artist: string, 
    source: <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src">string</a> // url to music file
)
</code></pre>

2.  set, append or insert playlist:
<pre><code>
    PlayerInterface.setPlaylist(Track[]) // sets a new playlist, can be an empty array
    PlayerInterface.clearPlaylist() // similar to setting empty array

    PlayerInterface.play( Track[] ) // sets a new playlist and starts playing
    PlayerInterface.play() // play current track if paused or stopped
    PlayerInterface.pause() // pause current track
    PlayerInterface.stop() // stop scurrent track

    PlayerInterface.skipNext() // skip to next track
    PlayerInterface.skipPrev() // skip to previous track when play time is less than 3 seconds else restart current track
    PlayerInterface.changeTrack(index: int) // switch to track at index, out of bund index ignored.

    PlayerInterface.setVolume(volme: int) // integer from 0 to 100, out of bound inputs ignored.

    PlayerInterface.shuffle(bool) // true or false to turn on/off shuffle

    PlayerInterface.playLater( Track[] ) // appends to end of playlist
    PlayerInterface.playNext( Track[] ) // insert after current track:
    
</code></pre>

## theming & customisation

This player is 100% made of react [mui](https://mui.com) component and can be customised as described [in the theming section](https://mui.com/customization/theming/).
The player should inherit your themes and style overrides if your app is already using mui theming solutions. Otherwise, create a new theme if the default is not to your liking. The guide here is not exhausitve. I strongly suggest you read on [mui customisation](https://mui.com/customization/theming)

### creating a theme

You would typicatlly create a theme as shown below

<pre><code>
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
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
  },
});
</code></pre>

Notice the convenience [color objects](https://mui.com/customization/color/) provided at @mui/material/colors.
Its also possible to assign the full object without being too specific: <code>primary:green</code>

For the theme to take effect Player must be a descendent of the ThemeProvider component

<pre><code>
import ThemeProvider from "@mui/material/styles/ThemeProvider";

<!-- prettier-ignore -->
// pass the theme object as prop
&lt;ThemeProvider theme={theme}&gt;
    &lt;Player /&gt;
&lt;/ThemeProvider &gt;
</code></pre>

### dark mode

To set up dark mode you can simply set palette mode field. creatTheme() will make the necessary palette modifications for you

<!-- prettier-ignore -->
<pre><code>
const theme = createTheme({
    palette: {
        mode: "dark",
    },
});
</code></pre>

You can also create two seperate palettes and programmatically create theme based on user or system preference. [makeTheme()](https://github.com/the-maazu/react-material-music-player/tree/main/src) holds similar logic for the [Demo](https://the-maazu.github.io/react-material-music-player/).

### targeting components

As described [in the theming section](https://mui.com/customization/theme-components/) its also possible to target mui components.

<pre><code>
// create theme
const theme = createTheme({
    // pallette overrides
});

theme = createTheme(theme, {

    components: {

        // component name
        MuiSlider: {
            styleOverrides: {
                // slot to target
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

        MuiToggleButton: {
             // set default props
            defaultProps: {
                color: "primary",
            },
        },
    }

});
</code></pre>

In the example above we are targting the [MuiSliders](https://mui.com/api/slider/), specifically the thumb and also changing default props for [MuiToggleButtons](https://mui.com/api/toggle-button/)(Repeat, Shuffle & Playlist Buttons). We can target alot more, [MuiPaper](https://mui.com/api/paper/)(Default Player background), [MuiIconButton](https://mui.com/api/icon-button/#main-content)(Control Buttons) and [MuiPopover](https://mui.com/api/popover/)(Playlist Popover background). All CSS, including nesting is valid here.

Have a look at the implementation of the [Demo](https://the-maazu.github.io/react-material-music-player/) at [App.js](https://github.com/the-maazu/react-material-music-player/blob/main/src/App.js) and [makeTheme.js](https://github.com/the-maazu/react-material-music-player/tree/main/src). Feel free to copy and modify theme to your liking.

Also feel free to make suggestion or feature requests [here](https://github.com/the-maazu/react-material-music-player/discussions/new), kindly set category to "idea".
Report bugs [here](https://github.com/the-maazu/react-material-music-player/issues). And if you want to contribute just make a pull request &#128522;.

## Dependencies

- [material-ui](https://material-ui.com/)
- [react](https://reactjs.org/)
- [react-redux](https://react-redux.js.org/)
- [react-draggable-list](https://www.npmjs.com/package/react-draggable-list)
