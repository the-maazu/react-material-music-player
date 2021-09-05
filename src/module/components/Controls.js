import React from 'react';

import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import { Grid } from '@material-ui/core';

import withoutPropagation from '../utils/withoutPropagation';

export default function Controls(props){

    const {
        isPlaying,
        onPlay,
        onPause,
        onSkipPrev,
        onSkipNext,
        disabled
    } = props

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
                disabled={disabled}>
                    <SkipPreviousIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton 
                onClick={ withoutPropagation(isPlaying? onPause : onPlay )}
                disabled={disabled}>
                    { isPlaying ? 
                    <PauseIcon fontSize="large"/>
                    :
                    <PlayIcon fontSize="large"/>
                    }
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton 
                onClick={withoutPropagation(onSkipNext)}
                disabled={disabled}>
                    <SkipNextIcon fontSize="large"/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

