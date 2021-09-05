import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root:{
        height: args => args.size,
        width: args => args.size,
        overflow: 'hidden',

        '& > img': {
            height: '100%'
        }
    }
}))

export default function CoverArt(props){

    const {
        src,
        size
    } = props;

    const classes = useStyles({size})

    return (
        <div className={classes.root}>
            <img src={src} alt={"cover art"}/>
        </div>
    )
}