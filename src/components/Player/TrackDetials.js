import React, { useState } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles';
import './TrackTitle.css'

export default class TrackDetails extends React.Component{

    constructor(props){
        super(props);
        this.rootRef = React.createRef();
        this.trackTitleRef = React.createRef();

        this.state = {scrolling: false}
    }

    componentDidMount(){
        const rootNode= this.rootRef.current;
        const trackTitleNode = this.trackTitleRef.current;

        console.log(rootNode.clientWidth)
        console.log(rootNode.scrollWidth)

        if(rootNode.scrollWidth > rootNode.clientWidth){

            trackTitleNode.style.animationName= 'scroll-text'
            trackTitleNode.style.animationDuration= '4s'
            trackTitleNode.style.animationIterationCount= 'infinite'
            trackTitleNode.style.animationFillMode= 'forwards'

            this.setState({scrolling: true})

        }
    }

    render(){
        
        return (
            <div 
            ref={this.rootRef}
            className={'root'}>
                <body 
                ref={this.trackTitleRef}
                className={'TrackDetails'}>
                    Killing Me Softly
                </body> 
            </div>
        )
    }
}