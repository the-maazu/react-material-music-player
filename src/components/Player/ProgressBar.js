import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root:{
        width: '100%',
    },
    timeText: {
        margin: theme.spacing(1)
    },
    slider: {
        width: '95%'
    }
  }));

export default function(){

    const classes = useStyles();

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        wrap='nowrap'
        className={classes.root}
        >
            <Grid item>
                <Typography className={classes.timeText}>
                    0:00
                </Typography>
            </Grid>
            <Grid item className={classes.slider}>
                <Slider aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>
                <Typography className={classes.timeText}>
                    0:00
                </Typography>
            </Grid>
        </Grid>
    )
}