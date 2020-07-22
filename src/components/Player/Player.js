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
import { useTheme } from '@material-ui/core/styles';

import ProgressBar from './ProgressBar.js'
import Controls from './Controls.js';
import VolumeControl from './VolumeControl.js'
import PlaylistControl from './PlaylistControl.js'
import PlayerModel from './model/PlayerModel.js';

import { connect } from 'react-redux'
import actionCreators from '../../redux/actionCreators.js'

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
        '& > div': {
            margin: isDesktop => isDesktop? theme.spacing(): null
        }
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
        width: isDesktop=> isDesktop? '10%':'100%',
        order: 1,
    } 
  }));

function Player(props){
    
    const theme = useTheme();
    const isDesktop = useMediaQuery('(min-width:768px)');
    const classes = useStyles(isDesktop);

    // const [player, updatePlayerModel] = useState(new PlayerModel(props.tracks));
    // const [maximised, expand] = useState(props.maximised);

    const {
        mediaState,
        currentTrack,
        shuffled,
        maximised,
        playlist,
        onPlay,
        onPause,
        onSkipPrev,
        onSkipNext,
        onReorder,
        onShuffle,
        onMaximise,
        onMinimise
    } = props

    return (
        <Collapse
        className={classes.root}
        collapsedHeight='10vh'
        in={maximised}
        >
            <Paper 
            className={classes.paper}>
                <Grid
                container
                direction={maximised ? 'column-reverse' : 'row-reverse'}
                justify='space-between'
                alignItems='center'
                wrap='nowrap'
                className={classes.container}
                style = {{ height: maximised ? '90vh' : '10vh',
                        padding: maximised? theme.spacing(4): theme.spacing()}}
                >
                    <Grid item className={classes.coverArt}
                    onClick={
                        () => {
                            if(!isDesktop){
                                if(maximised)
                                onMinimise()
                                else
                                onMaximise()
                            }
                        }
                    }>
                        <CoverArtFav 
                        coverArt={playlist[currentTrack].coverArt} 
                        large={maximised}/>
                    </Grid>

                    <Grid 
                    item
                    className={classes.trackDetails}
                    style={{width: maximised? '80%' : null}}>
                        <TrackDetails 
                        title={playlist[currentTrack].title}
                        artist={playlist[currentTrack].artist}
                        showArtist={maximised}/>
                    </Grid>

                    {maximised || isDesktop ? 
                    <Grid item className={classes.progressBar}>
                        <ProgressBar/>
                    </Grid> : null}

                    <Grid
                    item
                    className={classes.control}>
                        <Controls 
                        isPlaying={mediaState == 'playing' ? true: false}
                        onPlay={onPlay}
                        onPause={onPause}
                        onSkip={ i => {}}
                        />
                    </Grid>

                    {maximised || isDesktop ?
                    <Grid item className={classes.volumeControl}>
                        <VolumeControl/>
                    </Grid> : null}

                    {maximised || isDesktop?
                    <Grid item className={classes.playlistControl}>
                        <PlaylistControl 
                        list={playlist}
                        isShuffled={shuffled}
                        currentTrackIndex={currentTrack}
                        isDesktop={isDesktop}
                        onReorder={(newList) => {onReorder(newList)}}
                        />
                    </Grid> : null}
                    
                </Grid>
            </Paper>
        </Collapse>
    );
}

function mapStateToProps(state){
    return {...state};
}

function mapDispatchToProps(dispatch){
    return {
        onPlay: () => dispatch(actionCreators.play()),
        onPause: () => dispatch(actionCreators.pause()),
        onSkipPrev: (index, size) => dispatch(actionCreators.skipPrev(index, size)),
        onSkipNext: (index, size) => dispatch(actionCreators.skipNext(index, size)),
        onReorder: (playlist) => dispatch(actionCreators.updatePlaylist(playlist)),
        onShuffle: (bool) => dispatch(actionCreators.shuffle(bool)),
        onMaximise: () => dispatch(actionCreators.maximise()),
        onMinimise: () => dispatch(actionCreators.minimise())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)