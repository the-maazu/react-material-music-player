import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    slider: {
        width: '60vw'
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
            <Grid item>0:00</Grid>
            <Grid item className={classes.slider}>
                <Slider aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>0:00</Grid>
        </Grid>
    )
}