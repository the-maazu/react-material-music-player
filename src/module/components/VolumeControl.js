import React from 'react'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import IconButton from "@material-ui/core/IconButton";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";

const useStyles = makeStyles(theme => ({
    root:{
        width: '100%'
    },
    slider: {
        width: '50%'
    }
  }));

export default function VolumeControl(props){

    const classes = useStyles();

    const {
        value,
        onVolumeChange
    } = props

    const handleSliderChange = (event, newValue) => {
        onVolumeChange(newValue)
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
                <IconButton
                onClick={
                    () => onVolumeChange( value < 10? 0 : value-10)
                }>
                    <VolumeDownIcon/>
                </IconButton>
            </Grid>
            <Grid item className={classes.slider}>
                <Slider 
                value={value}
                aria-labelledby="continuous-slider" 
                onChange={handleSliderChange}/>
            </Grid>
            <Grid item>
                <IconButton
                onClick={
                    () => onVolumeChange( value > 90 ? 100 : value+10)
                }>
                    <VolumeUpIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}