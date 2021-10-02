import React from 'react'

import { shallowEqual, useSelector } from 'react-redux';

import Box from '@mui/material/Box'

export default function TrackDetails(props){
    
    const {
        title,
        artist,
    } = useSelector(
        (state) => {
            let currentTrack = state.playlist[state.currentTrack]
            return {
                title: currentTrack.title,
                artist: currentTrack.artist
            }
        },
        shallowEqual
    );

    const sx = props.sx

    return (
        <Box sx={sx}>
            <Box sx={{ typography: 'subtitl3' }}>{title}</Box>
            <Box sx={{ typography: 'subtitle2' }}>{artist}</Box>
        </Box>
    )
}