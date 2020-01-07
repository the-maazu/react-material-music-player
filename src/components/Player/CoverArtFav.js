import React, { useState, Children } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';
import CoverArt from './jpg.jpg'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${CoverArt})`,
        backgroundSize: '100%',
        width: '100%',
        height: '100%'
    }
  }));

export default function(props){

    const classes = useStyles();

    const [hovered, hovering] = useState(false);
    const [liked, like] = useState(false);

    return (
        <div
        className={classes.root}
        onMouseOver={() => hovering(true)}
        onMouseLeave={() => hovering(false)}
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