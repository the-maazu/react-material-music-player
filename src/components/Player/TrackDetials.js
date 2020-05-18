import React from 'react'


import ScrollingText from './ScrollingText.js'

export default function TrackDetails(props){

    const showArtist = props.showArtist;

    return (
        <div>
            <ScrollingText>
                Killing Me softly with 
            </ScrollingText>

            {showArtist ? 
            <ScrollingText >
                Killer Mikestact
            </ScrollingText> : null
            }
        </div>
    )
}