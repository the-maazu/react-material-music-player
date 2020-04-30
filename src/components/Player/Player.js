import React, { useState } from 'react'

import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import CoverArtFav from './CoverArtFav.js';
import TrackDetails from './TrackDetials.js'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import { Slider } from '@material-ui/core';

import ProgressBar from './ProgressBar.js'
import Controls from './Controls.js';
import VolumeControl from './VolumeControl.js'
import PlaylistControl from './PlaylistControl.js'

import PlaylistModel from './model/PlaylistModel.js';

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

export default function Player(props){

    const classes = useStyles();

    const [playlist, updatePlaylistModel] = useState(new PlaylistModel(props.tracks));
    const [expanded, collapse] = useState(props.expanded);

    const onReorder = function(newList){
        let newPlaylist = new PlaylistModel(newList);
        newPlaylist.shuffle=playlist.shuffle
        newPlaylist.currentTrackIndex = playlist.currentTrackIndex

        updatePlaylistModel(newPlaylist)
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
                direction={expanded ? 'column-reverse' : 'row-reverse'}
                justify='space-between'
                alignItems='center'
                wrap='nowrap'
                className={classes.container}
                style = { { height: expanded ? '90vh' : '10vh',}}
                >
                    <Grid item className={classes.coverArt}
                    onClick={() => collapse(!expanded)}>
                        <CoverArtFav 
                        coverArt={playlist.getCurrentTrack().coverArt} 
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
                        <PlaylistControl 
                        playlist={playlist}
                        onReorder={onReorder}
                        />
                    </Grid> : null}
                    
                </Grid>
            </Paper>
        </Collapse>
    );
}