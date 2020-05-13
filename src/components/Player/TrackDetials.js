import React, { useState } from 'react'
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'

const styles = {
    root: {
        overflow: 'hidden'
    },
    textContainer: {
        whiteSpace: 'nowrap'
    },
    trackTitleText: {
        display: 'inline'
    }
  };

class TrackDetails extends React.Component{

    constructor(props){
        super(props);

        this.rootRef = React.createRef();
        this.trackTitleRef = React.createRef();

        this.state = {scrolling: false}

        this.props = props
    }

    componentDidMount(){
        const rootNode= this.rootRef.current;
        const trackTitleNode = this.trackTitleRef.current;

        console.log(rootNode.clientWidth)
        console.log(rootNode.scrollWidth)

        if(rootNode.scrollWidth > rootNode.clientWidth){

            trackTitleNode.style.animationName= 'slide-horizontal'
            trackTitleNode.style.animationDuration= `${trackTitleNode.textContent.length/2}s`
            trackTitleNode.style.animationIterationCount= 'infinite'
            trackTitleNode.style.animationFillMode= 'forwards'

            this.setState({scrolling: true})

        }
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
                <div 
                className={classes.textContainer}
                ref={this.trackTitleRef}>
                    <Typography
                    className={classes.trackTitleText}>
                        Killing Me Softly &nbsp; &nbsp;
                    </Typography> 
                    
                    { this.state.scrolling ? 
                    <Typography 
                    className={classes.trackTitleText}>
                        Killing Me Softly &nbsp; &nbsp;
                    </Typography> : null
                    }
                </div>

                {false ? 
                <Typography className={classes.textContainer}>
                    Killer Mikestical
                </Typography> : null
                }
            </div>
        )
    }
}

TrackDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(TrackDetails);