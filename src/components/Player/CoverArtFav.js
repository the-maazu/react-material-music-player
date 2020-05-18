import React, { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root:{
        height: large => large? '40vh': '6vh',
        width: large => large? '40vh': '6vh',
        position: 'relative',

        '& > img': {
            height: 'inherit'
        }
    },
    likeButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
}))
export default function(props){

    const {
        coverArt,
        large
    } = props;

    const classes = useStyles(large)

    const [hovered, hovering] = useState(false);
    const [liked, like] = useState(false);

    return (
        <div
        onMouseOver={() => hovering(true)}
        onMouseLeave={() => hovering(false)}
        className={classes.root}
        >
            <img src={coverArt}/>
            
            <Fade
            in={hovered}
            className={classes.likeButtonContainer}
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