import React from 'react'

import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

import secondsToString from '../utils/secondsToString.js'

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import actionCreators from '../redux/actionCreators.js';

const useStyles = makeStyles(theme => ({
    timeText: {
        margin: theme.spacing(1)
    },
    slider: {
        width: '95%'
    }
  }));

export default function ProgressBar(){

    const classes = useStyles();

    const {
        timeLeft,
        currentTime
    } = useSelector(
        ({
            timeLeft,
            currentTime
        }) => ({
            timeLeft,
            currentTime
        }),
        shallowEqual
    )

    const dispatch = useDispatch()
    const onSeek = (time) => dispatch(actionCreators.seek(time))

    const  progress= (currentTime/ (timeLeft + currentTime) ) * 100

    const handleSliderChange = (event, newValue) => {
        onSeek( (newValue/100) * (currentTime + timeLeft) )
    };

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        wrap='nowrap'
        >
            <Grid item>
                <Typography className={classes.timeText}>
                    {secondsToString(currentTime)}
                </Typography>
            </Grid>
            <Grid item className={classes.slider}>
                <Slider 
                aria-labelledby="continuous-slider" 
                value={progress}
                onChange={handleSliderChange}/>
            </Grid>
            <Grid item>
                <Typography className={classes.timeText}>
                    {secondsToString(timeLeft)}
                </Typography>
            </Grid>
        </Grid>
    )
}