import React, { useState } from 'react'
import { makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import ScrollingText from './ScrollingText.js'


const useStyles = makeStyles({
        root: {
            overflow: 'hidden'
        }
    })

export default function TrackDetails(props){

    const classes = useStyles();

    const showArtist = props.showArtist;

    return (
        <div 
        className={classes.root}>

            <ScrollingText text="Killing Me Softly"/>

            {showArtist ? 
            <ScrollingText text="Killest Mikestic"/> : null
            }
        </div>
    )
}