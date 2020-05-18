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
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ProgressBar from './ProgressBar.js'
import Controls from './Controls.js';
import VolumeControl from './VolumeControl.js'
import PlaylistControl from './PlaylistControl.js'
import PlaylistModel from './model/PlaylistModel.js';

import './keyframes.css'

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: 0,
        overflow: isDesktop => isDesktop? 'visible': 'hidden',
    },
    paper: {
        width:'100vw',
        height: '90vh',
    },
    container: {
        spacing: theme.spacing(),
        padding: theme.spacing()
    },
    coverArt: {
        order: 6
    },
    trackDetails: {
        width: isDesktop=> isDesktop? '10%': '20%',
        order: 5
    },
    progressBar: {
        width: isDesktop => isDesktop? '60%' : '80%',
        order: isDesktop => isDesktop ? 3 : 4
    },
    control: {
        width: isDesktop => isDesktop? '10%' : '60%',
        order: isDesktop => isDesktop ? 4 : 3,
    },
    volumeControl: {
        width: isDesktop => isDesktop? '10%': '100%' ,
        order: 2
    },
    playlistControl: {
        width: isDesktop=> isDesktop? '20%':'100%',
        order: 1,
    } 
  }));

export default function Player(props){

    const isDesktop = useMediaQuery('(min-width:768px)');
    const classes = useStyles(isDesktop);

    const [playlist, updatePlaylistModel] = useState(new PlaylistModel(props.tracks));
    const [expanded, expand] = useState(props.expanded);

    const onPlaylistReorder = function(newList){

        updatePlaylistModel(playlist.getNewPlaylist(newList));
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
                    onClick={
                        () => {
                            if(!isDesktop){
                                expand(!expanded)
                            }
                        }
                    }>
                        <CoverArtFav 
                        coverArt={playlist.getCurrentTrack().coverArt} 
                        collapsed={!expanded}/>
                    </Grid>

                    <Grid 
                    item
                    className={classes.trackDetails}
                    style={{width: expanded? '80%' : null}}>
                        <TrackDetails showArtist={expanded}/>
                    </Grid>

                    {expanded || isDesktop ? 
                    <Grid item className={classes.progressBar}>
                        <ProgressBar/>
                    </Grid> : null}

                    <Grid 
                    item
                    className={classes.control}>
                        <Controls />
                    </Grid>

                    {expanded || isDesktop ?
                    <Grid item className={classes.volumeControl}>
                        <VolumeControl/>
                    </Grid> : null}

                    {expanded || isDesktop?
                    <Grid item className={classes.playlistControl}>
                        <PlaylistControl 
                        list={playlist.getPlaylist()}
                        isShuffled={playlist.isShuffled()}
                        currentTrackIndex={playlist.getCurrentTrackIndex()}
                        isDesktop={isDesktop}
                        onReorder={onPlaylistReorder}
                        />
                    </Grid> : null}
                    
                </Grid>
            </Paper>
        </Collapse>
    );
}