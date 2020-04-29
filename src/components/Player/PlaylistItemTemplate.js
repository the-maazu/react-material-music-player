import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography"


export default class PlaylistItemTemplate extends React.Component {

    constructor(props){
        super(props);

        this.props = props
    }


    render() {

        const {

            item,
            itemSelected,
            anySelected,
            dragHandleProps

        } = this.props;

        return (
            <div
            {...dragHandleProps}
            style={{'max-height':'100%'}}
            >
                <img src={item.coverArt}
                style={{height:'10px'}}>
                    {/* {Boolean(currentTrack == item.ID) ? <PlayIcon/> : null} */}
                </img>

                <div>
                    <Typography variant='subtitle1'>
                        {item.title}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {item.artist}
                    </Typography>
                </div>
            </div>
        )
    }
}