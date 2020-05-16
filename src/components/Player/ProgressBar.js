import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root:{
        margin: theme.spacing()
    },
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
            <Grid item>
                <Typography>
                    0:00
                </Typography>
            </Grid>
            <Grid item className={classes.slider}>
                <Slider aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>
                <Typography>
                    0:00
                </Typography>
            </Grid>
        </Grid>
    )
}