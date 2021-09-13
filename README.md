This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## The Player

Basically I tried to create a "biolerplateless" music player that can be easily customised. &#128540;

Example hosted [here](https://the-maazu.github.io/react-material-music-player/)

## Documentation

To use the player

1. npm install react-material-music-player

2. import [Player](https://github.com/the-maazu/react-material-music-player/blob/master/src/module/components/Player.js), { [TrackModel](https://github.com/the-maazu/react-material-music-player/tree/master/src/module/model), [PlayerInterface](https://github.com/the-maazu/react-material-music-player/blob/master/src/module/interface.js) } from 'react-material-music-player'

3. render player preferably in root of your app (App.js)

    <code>&lt;Player/&gt;</code>

4. create tracks: 

    <code> new TrackModel( index: number, coverArt: string, artist: string, source: string) </code>

5. <code> PlayerInterface.play([arrayOfTracks]) // sets a new playlist</code>

6. <code> PlayerInterface.playLater([arrayOfTracks]) // appends to end of playlist </code>

7. <code> PlayerInterface.playAfter([arrayOfTracks]) // inserts after current track </code>

refer to [App.js](https://github.com/the-maazu/react-material-music-player/blob/master/src/App.js) for example usage.

### Theming & Customisation

This player is 100% made of react [material-ui](https://material-ui.com/) component and can be customised as described [here](https://material-ui.com/customization/theming/). 

The player should inherit your themes and style overrides if your app is already using material-ui theming(ThemeProvider).

If you want more customisation beyond styles and theme, I suggest you clone and copy [src/module](https://github.com/the-maazu/react-material-music-player/tree/master/src/module) to your project and make more customisation as you please. Safe to say the UI can be heavily customised without affecting functionality (redux and middleware).

Also feel free to make suggestion or feature requests [here](https://github.com/the-maazu/react-material-music-player/discussions/new), kindly set category to "idea".
Report bugs [here](https://github.com/the-maazu/react-material-music-player/issues). And if you want to contribute just make a pull request &#128522;.

## Dependencies

* [material-ui](https://material-ui.com/)
* [react](https://reactjs.org/)
* [react-redux](https://react-redux.js.org/)
* [react-draggable-list](https://www.npmjs.com/package/react-draggable-list)