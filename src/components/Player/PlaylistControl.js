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
import PlaylistItemTemplate from './PlaylistItemTemplate.js'

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: isDesktop=> isDesktop? 'relative': null,
        bottom: isDesktop=> isDesktop? 0 : null
    },
    collapse: (isDesktop) => isDesktop? {
        position: 'absolute',
        bottom: '100%',
        width: '100%'
    } : null,
    draggablelistContainer: {
        overflow: 'auto',
        height: '60vh'
    },
    buttonGroup: {
        width: '100%',
    },
    button: {
        width: '50%'
    }
});

export default function(props){

    const {
        playlist,
        isDesktop,
        onReorder
    } = props

    const classes = useStyles(isDesktop);

    const draggablelistContainerRef = React.createRef();

    const [values, setValues] = useState(playlist.shuffle ? ['shuffle']: []);
    const [expanded, expand] = useState(false);
    
    const handleChange = (event, newValues) => {
        setValues(newValues);

        if (Boolean(newValues.find((element)=> element == 'show-playlist' ))){
            expand(true);
        }else expand(false)
    };

    return (
        <div className={classes.root}>

            <Collapse
            collapsedHeight={'0'}
            className={classes.collapse}
            in={expanded}
            >
                <Paper
                elevation='0'
                className={classes.draggablelistContainer} 
                ref={draggablelistContainerRef}>
                    <ReactDraggableList 
                    list={playlist.tracks}
                    itemKey='ID'
                    template={PlaylistItemTemplate}
                    onMoveEnd={(newList)=> {onReorder(newList)}}
                    container={()=> draggablelistContainerRef.current }
                    commonProps={{currentTrackID: playlist.getCurrentTrack().ID}}
                    />
                </Paper>
                    
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