import React from 'react'

import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

import secondsToString from '../utils/secondsToString.js'

const useStyles = makeStyles(theme => ({
    root:{
        width: '100%',
    },
    timeText: {
        margin: theme.spacing(1)
    },
    slider: {
        width: '95%'
    }
  }));

export default function ProgressBar(props){

    const classes = useStyles();

    const {
        timeLeft,
        currentTime,
        onSeek
    } = props

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
        className={classes.root}
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