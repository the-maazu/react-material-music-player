import React, { useState, Children } from 'react';

import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import { Grid } from '@material-ui/core';

export default function(props){

    const {
        isPlaying,
        onPlay,
        onPause,
        onSkipPrev,
        onSkipNext,
        disabled
    } = props

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        wrap='nowrap'
        >
            <Grid item>
                <IconButton 
                onClick={() => onSkipPrev()}
                disabled={disabled}>
                    <SkipPreviousIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton 
                onClick={ isPlaying? onPause : onPlay }
                disabled={disabled}>
                    { isPlaying ? 
                    <PauseIcon fontSize="large"/>
                    :
                    <PlayIcon fontSize="large"/>
                    }
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton 
                onClick={() => onSkipNext()}
                disabled={disabled}>
                    <SkipNextIcon fontSize="large"/>
                </IconButton>
            </Grid>
        </Grid>
    )
}