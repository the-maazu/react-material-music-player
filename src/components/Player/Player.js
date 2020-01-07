import React, { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import CoverArtFav from './CoverArtFav.js';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import ProgressBar from './ProgressBar.js'
import { Slider } from '@material-ui/core';
import Controls from './Controls.js';


const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: 0,
        background: 'rgb(175, 175, 175, 0.8)',
        padding: '10vw',
        width:'100vw',
        height: '90vh'
    },
    items: {
        width: '100%'
    },
    coverArt: {
        height: '80vw'
    }
  }));

export default function Player(){

    const classes = useStyles();

    return (
        <Grid 
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className={classes.root}
        >
            <Grid item className={classes.items + ' ' + classes.coverArt}>
                <CoverArtFav/>
            </Grid>
            <Grid item className={classes.items}>
                <ProgressBar/>
            </Grid>
            <Grid item className={classes.items}>
                <Controls/>
            </Grid>
        </Grid>
    );
}