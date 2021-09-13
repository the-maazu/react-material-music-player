This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## For the culture

This is a "first project" long overdue.

Basically I tried to create a "biolerplateless" music player that can be easily customised. &#128540;

Feel free to fork or contribute here.

<img src="https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/public/desktop_mode.png" alt="destop">
<img src="https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/public/mobile_minimised.png" alt="mobile minimised" style="width:30%">
<img src="https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/public/mobile_maximised.png" alt="mobile maximised" style="width:30%">
<img src="https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/public/mobile_maximised_playlist.png" alt="mobile maximised with playlist" style="width:30%">

## Documentation

A little info below &#128071;&#127998;

Basically all the code you should care about is in src/module.

To use the player clone this repo

* npm install react-material-music-player

* import [Player](https://github.com/the-maazu/react-material-music-player/blob/master/src/module/components/Player.js), { [TrackModel](https://github.com/the-maazu/react-material-music-player/tree/master/src/module/model), [PlayerInterface](https://github.com/the-maazu/react-material-music-player/blob/master/src/module/interface.js) } from 'react-material-music-player'

refer to [App.js](https://github.com/the-maazu/react-material-music-player/blob/master/src/App.js) for example usage.

Example hosted [here](https://the-maazu.github.io/react-material-music-player/)

### Theming

This player is 100% made of react [material-ui](https://material-ui.com/) component and can be customised using theming as described [here](https://material-ui.com/customization/theming/)

Hack your way through the code if you want more customisation. Safe to say the UI can be heavily modified without really affecting core functionality(redux and middleware)

## Scripts

'yarn start' to run the example react app with sample music files loaded in [App.js](https://github.com/the-maazu/react-material-music-player/blob/master/src/App.js)

## Dependencies

* [material-ui](https://material-ui.com/)
* [react](https://reactjs.org/)
* [react-redux](https://react-redux.js.org/)
* [react-draggable-list](https://www.npmjs.com/package/react-draggable-list)