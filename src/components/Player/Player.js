import React, { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import CoverArtFav from './CoverArtFav.js';
import TrackDetails from './TrackDetials.js'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import ProgressBar from './ProgressBar.js'
import { Slider } from '@material-ui/core';
import Controls from './Controls.js';
import VolumeControl from './VolumeControl.js'
import PlaylistControl from './PlaylistControl.js'

import CoverArt from './jpg.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: 0,
        overflow: 'hidden'
    },
    paper: {
        width:'100vw',
        height: '90vh',
    },
    container: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    coverArt: {
        order: 6
    },
    trackDetails: {
        width: '20%',
        order: 5
    },
    progressBar: {
        order: 4
    },
    control: {
        width: '60%',
        order: 3
    },
    volumeControl: {
        order: 2
    },
    playlistControl: {
        width: '100%',
        order: 1,
        border: '5px solid red'
    }
  }));

export default function Player(){

    const classes = useStyles();
    const [expanded, collapse] = useState(false);

    var  gridProps;
    
    if(expanded){
        gridProps = {
            direction: 'column-reverse',
            justify: 'space-between',
            alignItems: 'center'
        }
    }
    else{
        gridProps = {
            direction: 'row-reverse',
            justify: 'space-between',
            alignItems: 'center'
        }
    }
    return (
        <Collapse
        className={classes.root}
        collapsedHeight='10vh'
        in={expanded}
        >
            <Paper 
            className={classes.paper}>
                <Grid
                container
                {...gridProps}
                wrap='nowrap'
                className={classes.container}
                style = { { height: expanded ? '90vh' : '10vh',}}
                >
                    <Grid item className={classes.coverArt}
                    onClick={() => collapse(!expanded)}>
                        <CoverArtFav 
                        coverArt={CoverArt} 
                        collapsed={!expanded}/>
                    </Grid>

                    <Grid 
                    item
                    className={classes.trackDetails}>
                        <TrackDetails/>
                    </Grid>

                    {expanded ? 
                    <Grid item className={classes.progressBar}>
                        <ProgressBar/>
                    </Grid> : null}

                    <Grid 
                    item
                    className={classes.control}>
                        <Controls />
                    </Grid>

                    {expanded ?
                    <Grid item className={classes.volumeControl}>
                        <VolumeControl/>
                    </Grid> : null}

                    {expanded ?
                    <Grid item className={classes.playlistControl}>
                        <PlaylistControl shuffle={true}/>
                    </Grid> : null}
                    
                </Grid>
            </Paper>
        </Collapse>
    );
}