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

import CoverArt from './jpg.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: 0,
    },
    paper: {
        width:'100vw',
        height: '90vh',
    },
    container: {
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    trackDetails: {
        width: '20%'
    },
    controls: {
        width: '60%',   
    }
  }));

export default function Player(){

    const classes = useStyles();
    const [expanded, collapse] = useState(false);

    var  gridProps;
    
    if(expanded){
        gridProps = {
            direction: 'column',
            justify: 'space-around',
            alignItems: 'center'
        }
    }
    else{
        gridProps = {
            direction: 'row',
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
            className={classes.paper}
            onClick={() => collapse(!expanded)}>
                <Grid
                container
                {...gridProps}
                wrap='nowrap'
                className={classes.container}
                style = { { height: expanded ? '90vh' : '10vh',}}
                >
                    <Grid item>
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
                    <Grid item>
                        <ProgressBar/>
                    </Grid> : null}

                    <Grid 
                    item
                    className={classes.controls}>
                        <Controls />
                    </Grid>

                    {expanded ?
                    <Grid item>
                        <VolumeControl/>
                    </Grid> : null}
                </Grid>
            </Paper>
        </Collapse>
    );
}