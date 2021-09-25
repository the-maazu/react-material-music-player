import React from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import { Grid } from '@material-ui/core';

import actionCreators from '../redux/actionCreators';
import withoutPropagation from '../utils/withoutPropagation';
import { MediaStates } from '../redux/store';

export default function Controls(props){

    const {
        mediaState,
        currentTrack,
    } = useSelector(
        ({mediaState,currentTrack}) => ({mediaState,currentTrack}),
        shallowEqual
    )

    const dispatch = useDispatch()
    const onSkipNext = () => dispatch(actionCreators.changeTrack(currentTrack+1))
    const onSkipPrev = () => dispatch(actionCreators.changeTrack(currentTrack-1))
    const onPlay = () => dispatch(actionCreators.play())
    const onPause = () => dispatch(actionCreators.pause())

    const playing = mediaState === MediaStates.playing ? true : false

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        wrap='nowrap'
        >
            <Grid item>
                <IconButton 
                onClick={withoutPropagation(onSkipPrev)}
                >
                    <SkipPreviousIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton 
                onClick={ 
                    withoutPropagation(playing ? onPause : onPlay )
                }>
                    { playing ? 
                    <PauseIcon fontSize="large"/>
                    :
                    <PlayIcon fontSize="large"/>
                    }
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton 
                onClick={withoutPropagation(onSkipNext)}
                >
                    <SkipNextIcon fontSize="large"/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

