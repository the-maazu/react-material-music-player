import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayIcon from "@material-ui/icons/PlayArrowRounded";

class PlaylistTemplate extends React.Component {

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

        const {
            
            coverArt,
            title,
            artist,
            playing

        } = this.props.commonProps;

        return (
            <Paper component='span'
            {...dragHandleProps}
            style={{height:'100%'}}
            >
                <img src={coverArt}
                style={{height:'80%'}}>
                    {Boolean(playing) ? <PlayerIcon/> : null}
                </img>

                <div>
                    <Typography variant='subtitle1'>
                        {title}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {artist}
                    </Typography>
                </div>
            </Paper>
        )
    }
}