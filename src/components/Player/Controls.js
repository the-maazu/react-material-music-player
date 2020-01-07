import React, { useState, Children } from 'react';
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import { Grid } from '@material-ui/core';

export default function(){

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Grid item>
                <IconButton>
                    <SkipPreviousIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton>
                    <PlayIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton>
                    <SkipNextIcon fontSize="large"/>
                </IconButton>
            </Grid>
        </Grid>
    )
}