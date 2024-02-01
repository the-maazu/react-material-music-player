import React from "react";
import { Provider } from "react-redux";

import PlayerRoot from "./components/Player.js";
import { Track, RepeatMode as RepeatModes } from "./redux/types.js";
import PlayerInterface from "./interface.js";
import store from "./redux/store.js";

/**
 * @typedef {object} PlayerProps
 * @prop {object} [sx={ width: "100vw", position: "fixed", bottom: 0, boxSizing: "border-box", borderRadius: `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0`, paddingRight: theme.spacing(1), paddingLeft: theme.spacing(1), overflow: "hidden", transition: theme.transitions.create(["all"])}]
 *  - This is a superset of CSS introduced with muiv5. You can override the default styles using this prop. It is possible to nest pseudo-selectors and target children components too(:hover, & > \*, etc).
 * @prop {boolean} [disableDrawer=false] - Mobile drawer is activated when player is too small to contain all the controls. It is likely you would want this feature disabled if you render the Player in the normal document flow or want to use Player as widget in your app.
 * @prop {string} [defaultArt] - src for default cover art when no track is loaded.
 */

/**
 * The Player component
 * @param {PlayerProps} [props]
 */
function Player(props) {
  return (
    <Provider store={store}>
      <PlayerRoot {...props} />
    </Provider>
  );
}

export default Player;

/**@deprecated use "Track"" instead*/
const TrackModel = Track;
export { Track, TrackModel, PlayerInterface, RepeatModes };
