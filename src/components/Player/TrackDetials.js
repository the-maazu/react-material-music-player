import React, { useState } from 'react'
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'

import ScrollingText from './ScrollingText.js'

const styles = {
    root: {
        overflow: 'hidden'
    }
  };

class TrackDetails extends React.Component{

    constructor(props){
        super(props);

        this.rootRef = React.createRef();
        this.trackTitleRef = React.createRef();
        this.artistRef = React.createRef()

        this.props = props
    }

    render(){
        
        const {
            classes,
            showArtist
        } = this.props;

        return (
            <div 
            ref={this.rootRef}
            className={classes.root}>

                <ScrollingText text="Killing Me Softly"/>

                {false ? 
                <ScrollingText text="Killest Mikestic"/> : null
                }
            </div>
        )
    }
}

TrackDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(TrackDetails);