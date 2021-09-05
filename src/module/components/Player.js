import React from 'react'

import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';

import CoverArt from './CoverArt.js';
import TrackDetails from './TrackDetials.js'
import ProgressBar from './ProgressBar.js'
import Controls from './Controls.js';
import VolumeControl from './VolumeControl.js'
import PlaylistControl from './PlaylistControl.js'
import withoutPropagation from '../utils/withoutPropagation.js';

import { connect } from 'react-redux'
import actionCreators from '../redux/actionCreators.js'

import '../css/keyframes.css'

const MAXHEIGHT = '90vh'
const MINHEIGHT = '10vh'

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: 0,
        overflow: isDesktop => isDesktop? 'visible': 'hidden',
    },
    paper: {
        width:'100vw',
        height: MAXHEIGHT,
    },
    container: {
        '& > div': {
            margin: isDesktop => isDesktop? theme.spacing(): null
        }
    },
    dropDownButton: {
        width: '100%',
        order: 7,
        '& > *':{
            transform: 'rotate(90deg)',
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

    const {
        mediaState,
        currentTrack,
        shuffled,
        maximised,
        playlist,
        onPlay,
        onPause,
        onChangeTrack,
        onReorder,
        onShuffle,
        onMaximise,
        onMinimise,
        currentTime,
        timeLeft,
        onSeek,
        onVolumeChange,
        volume
    } = props

    // if no songs are loaded do not load player
    if(playlist.length === 0)
    return null;

    const maximise = () => {
        if(isDesktop || maximised)
        return

        onMaximise()
    }

    const minimise = () => {
        if(!maximised)
        return

        onMinimise()
    }

    return (
        <Collapse
        className={classes.root}
        collapsedHeight={MINHEIGHT}
        in={maximised}
        >
            <Paper 
            className={classes.paper}
            onClick={withoutPropagation(maximise)}>
                <Grid
                container
                direction={maximised ? 'column-reverse' : 'row-reverse'}
                justify='space-between'
                alignItems='center'
                wrap='nowrap'
                className={classes.container}
                style = {{
                    height: maximised ? MAXHEIGHT : MINHEIGHT,
                    padding: maximised? theme.spacing(4): theme.spacing(),
                    paddingTop: '0px' // push drop down button up
                }}
                >
                    {maximised ?
                    <IconButton
                    className={classes.dropDownButton}
                    onClick={withoutPropagation(minimise)}
                    >
                        <ArrowForwardIos fontSize="small"/>
                    </IconButton>: null}

                    <Grid item className={classes.coverArt}>
                        <CoverArt 
                        src={playlist[currentTrack].coverArt} 
                        size={maximised? '40vh': '6vh'}/>
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
                        <ProgressBar 
                        currentTime={currentTime} 
                        timeLeft={timeLeft}
                        onSeek={onSeek}/>
                    </Grid> : null}

                    <Grid
                    item
                    className={classes.control}>
                        <Controls
                        disabled = {playlist.length === 0}
                        isPlaying={mediaState === 'playing' ? true: false}
                        onPlay={onPlay}
                        onPause={onPause}
                        onSkipNext={() => onChangeTrack(currentTrack+1)}
                        onSkipPrev={() => onChangeTrack(currentTrack-1)}
                        />
                    </Grid>

                    {maximised || isDesktop ?
                    <Grid item className={classes.volumeControl}>
                        <VolumeControl 
                        value = {volume}
                        onVolumeChange={onVolumeChange}/>
                    </Grid> : null}

                    {maximised || isDesktop?
                    <Grid item className={classes.playlistControl}>
                        <PlaylistControl 
                        list={playlist}
                        isShuffled={shuffled}
                        currentTrackIndex={currentTrack}
                        isDesktop={isDesktop}
                        onReorder={onReorder}
                        onShuffle={onShuffle}
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
        onChangeTrack: (index) => dispatch(actionCreators.changeTrack(index)),
        onReorder: (playlist, currentTrack) =>{
            dispatch(actionCreators.updatePlaylist(playlist))
            dispatch(actionCreators.changeTrack(currentTrack))
        },
        onShuffle: (bool) => dispatch(actionCreators.shuffle(bool)),
        onMaximise: () => dispatch(actionCreators.maximise()),
        onMinimise: () => dispatch(actionCreators.minimise()),
        onSeek: (time) => dispatch(actionCreators.seek(time)),
        onVolumeChange: (value) => dispatch(actionCreators.changeVolume(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)