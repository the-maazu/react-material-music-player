import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles} from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const styles = {
    root: {
        whiteSpace: 'nowrap'
    },
}

class ScrollingText extends React.Component{

    constructor(props){
        super(props)

        this.state = {scrolling: false}

        this.props = props;

        this.rootRef = React.createRef()
        this.textRef = React.createRef()

    }

    componentDidMount(){
        const rootNode= this.rootRef.current;
        const textNode = this.textRef.current;

        console.log(rootNode.clientWidth)
        console.log(rootNode.scrollWidth)

        if(rootNode.scrollWidth > rootNode.clientWidth){

            textNode.style.animationName= 'slide-horizontal'
            textNode.style.animationDuration= `${textNode.textContent.length/2}s`
            textNode.style.animationIterationCount= 'infinite'
            textNode.style.animationFillMode= 'forwards'

            this.setState({scrolling: true})

        }
    }

    render(){

        const {
            text,
            classes
        } = this.props

        return (
            <div
            className={classes.root}
            ref={this.rootRef}>

                <Typography 
                className={classes.text}
                ref={this.textRef}>
                    {text} &nbsp; &nbsp; { this.state.scrolling? text: null} &nbsp; &nbsp;
                </Typography>
            </div>
        )

    }
}

ScrollingText.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(ScrollingText);