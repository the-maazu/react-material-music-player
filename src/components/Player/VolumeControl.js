import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import IconButton from "@material-ui/core/IconButton";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";

const useStyles = makeStyles(theme => ({
    slider: {
        width: '50vw'
    }
  }));

export default function(){

    const classes = useStyles();

    return (
        <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.root}
        >
            <Grid item>
                <IconButton>
                    <VolumeDownIcon/>
                </IconButton>
            </Grid>
            <Grid item className={classes.slider}>
                <Slider aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>
                <IconButton>
                    <VolumeUpIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}