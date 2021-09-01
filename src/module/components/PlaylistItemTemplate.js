import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const styles = {
    root: {
        maxHeight:'100%',
        '& img': {
            height:'50px'
        },
        '& img ~ div':{
            position: 'absolute', 
            top: 0, 
            left: 0,
            height: '100%', 
            width: '100%'
        }
    },
  };

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
            {...dragHandleProps}
            className={classes.root}
            >
                <Grid item style={{position: 'relative'}}>
                    <img src={item.coverArt} alt={"cover art"}/>

                    <Grid 
                    container
                    justify='center'
                    alignContent='center' 
                    >
                        <Grid item>
                            {Boolean(commonProps.currentTrackID === item.ID) ? <PlayIcon item /> : null}
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item>
                    <Typography variant='subtitle1'>
                        {item.title}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {item.artist}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

PlaylistItemTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PlaylistItemTemplate);