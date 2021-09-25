import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';

import ScrollingText from './ScrollingText.js'

export default function TrackDetails(){
    
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

    return (
        <div>
            <ScrollingText>
               {title}
            </ScrollingText>

            <ScrollingText >
                {artist}
            </ScrollingText>
        </div>
    )
}