import React from 'react'


import ScrollingText from './ScrollingText.js'

export default function TrackDetails(props){

    const {
        title,
        artist,
        showArtist
    } = props;

    return (
        <div>
            <ScrollingText>
               {title}
            </ScrollingText>

            {showArtist ? 
            <ScrollingText >
                {artist}
            </ScrollingText> : null
            }
        </div>
    )
}