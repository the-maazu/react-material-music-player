import React, { useState, Children } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';

export default function(props){

    const {coverArt,
    collapsed} = props;

    const [hovered, hovering] = useState(false);
    const [liked, like] = useState(false);

    const mystyle = {backgroundImage: `url(${props.coverArt})`,
            backgroundSize: '100% 100%',
            width: collapsed ? '8vh' : '60vw',
            height: collapsed ? '8vh' : '60vw',
        }

    return (
        <div
        onMouseOver={() => hovering(true)}
        onMouseLeave={() => hovering(false)}
        style = {mystyle}
        >
            <Fade
            in={hovered}
            >
                <ToggleButton
                value='like'
                selected={liked}
                onChange= {() => like(!liked)}
                >
                    <FavoriteIcon/>
                </ToggleButton>
            </Fade>
        </div>
    )
}