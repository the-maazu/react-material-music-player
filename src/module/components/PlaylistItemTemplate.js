import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import ReorderIcon from '@material-ui/icons/Menu'

import CoverArt from './CoverArt';
import withoutPropagation from '../utils/withoutPropagation';

const styles = theme => ({
    root: {
        maxHeight:'100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(),
        '& > *':{
            marginRight: theme.spacing()
        }
    },
    coverArt: {
        height:'50px'
    },
    nowPlayingIconContainer: {
        position: 'absolute', 
        top: 0, 
        left: 0,
        height: '100%', 
        width: '100%'
    }
  });

class PlaylistItemTemplate extends React.Component {

    constructor(props){
        super(props);

        this.props = props

    }


    render() {

        const {

            item,
            dragHandleProps,
            commonProps,
            classes

        } = this.props;

        return (
            <Grid 
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            wrap='nowrap'
            className={classes.root}
            onClick={
                withoutPropagation(
                    commonProps.onTrackSelect, commonProps.listOfID.findIndex((ID) => ID === item.ID)
                )
            }
            >
                {Boolean(commonProps.currentTrackID === item.ID) ? <PlayIcon item /> : null}
                
                <CoverArt item src={item.coverArt} size='50px'/>
                
                <Grid item xs={9}>
                    <Typography variant='subtitle1'>
                        {item.title}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {item.artist}
                    </Typography>
                </Grid>
                
                <Grid item xs={1}>
                    <ReorderIcon 
                    item {...dragHandleProps}
                    onClick={(e) => {e.stopPropagation()}}/>
                </Grid>
            </Grid>
        )
    }
}

PlaylistItemTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PlaylistItemTemplate);