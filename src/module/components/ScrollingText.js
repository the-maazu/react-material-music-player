import React from 'react'

import Typography from '@material-ui/core/Typography'
import { withStyles} from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const styles = (theme) => { return {
    root: {
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    textContainer: {
        '& p': {
            marginRight: theme.spacing(),
        }
    }
}}

class ScrollingText extends React.Component{

    constructor(props){
        super(props)

        this.state = {scrolling: false}
        this.props = props;

        this.rootRef = React.createRef()
        this.textRef = React.createRef()

    }

    updateScrollingEffect(rootRef, textRef){

        const rootNode= this.rootRef.current;
        const textNode = this.textRef.current;

        if(rootNode.clientWidth < textNode.scrollWidth && !this.state.scrolling){

            textNode.style.width=`${textNode.scrollWidth + 8}px`
            textNode.style.animationName= 'slide-horizontal'
            textNode.style.animationDuration= `${(textNode.textContent.length)/4}s`
            textNode.style.animationIterationCount= 'infinite'
            textNode.style.animationFillMode= 'forwards'

            this.setState({scrolling: true})
        }
        else if(rootNode.clientWidth >= textNode.scrollWidth/2 && this.state.scrolling){

            textNode.style.width='auto'
            textNode.style.animationName= undefined
            textNode.style.animationDuration= '0'
            textNode.style.animationIterationCount= '1'
            textNode.style.animationFillMode= undefined

            this.setState({scrolling: false})
        }
    }

    componentDidUpdate(){
        this.updateScrollingEffect()
    }

    componentDidMount(){
        this.updateScrollingEffect()
    }

    render(){

        const {
            children,
            classes
        } = this.props

        return (
            <div
            className={classes.root}
            ref={this.rootRef}>
                <div 
                ref={this.textRef}
                className={classes.textContainer}>
                    <Typography
                    align={this.state.overflown? 'left': 'center'}
                    display='inline'
                    >
                        {children}
                    </Typography>

                    {this.state.scrolling?
                    <Typography
                    align={this.state.overflown? 'left': 'center'}
                    display='inline'
                    >
                        {children}
                    </Typography> : null
                    }
                </div>
            </div>
        )

    }
}

ScrollingText.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(ScrollingText);