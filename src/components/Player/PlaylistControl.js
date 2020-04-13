import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlaylistIcon from "@material-ui/icons/QueueMusic";
import Collapse from '@material-ui/core/Collapse';
import ReactDraggableList from 'react-draggable-list';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    playlist: {
        height: '60vh'
    },
    buttonGroup: {
        width: '100%',
    },
    button: {
        width: '50%'
    },
    tamplateRoot: {
        width:'100%',

        '& img': {
            height:'80%',
        }
    }
});

export default function(props){

    const classes = useStyles();

    const [values, setValues] = useState(props.shuffle ? ['shuffle']: []);
    const [expanded, expand] = useState(false);

    const handleChange = (event, newValues) => {
        setValues(newValues);

        if (Boolean(newValues.find((element)=> element == 'show-playlist' ))){
            expand(true);
        }else expand(false)
    };


    function ListTemplate(props){
    
        const [playing, setPlaying] = useState(Boolean(props.playing))
        const {
            coverArt,
            title,
            artist
        } = props.track
    
        return (
            <Paper component='span' className={classes.templateRoot}>
                <img src={coverArt}/>
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

    return (
        <div className={classes.root}>

            <Collapse
            collapsedHeight={'0'}
            in={expanded}>
                <div className={classes.playlist}>

                </div>
            </Collapse>

            <ToggleButtonGroup
            className={classes.buttonGroup}
            position='center' 
            value={values}
            onChange={handleChange}
            >
                <ToggleButton 
                value='shuffle'
                className={classes.button}
                >
                    <ShuffleIcon/>
                </ToggleButton>

                <ToggleButton 
                value='show-playlist'
                className={classes.button}
                >
                    <PlaylistIcon/>
                </ToggleButton>

            </ToggleButtonGroup>
        </div>
    )
}