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
        onSkip,
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
                <IconButton onClick={() => onSkip(-1)}>
                    <SkipPreviousIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={ isPlaying? onPause : onPlay }>
                    { isPlaying ? 
                    <PauseIcon fontSize="large"/>
                    :
                    <PlayIcon fontSize="large"/>
                    }
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => onSkip(1)}>
                    <SkipNextIcon fontSize="large"/>
                </IconButton>
            </Grid>
        </Grid>
    )
}