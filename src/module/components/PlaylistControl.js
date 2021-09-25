import React,{useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../redux/actionCreators.js';

import { makeStyles } from '@material-ui/core/styles';
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlaylistIcon from "@material-ui/icons/QueueMusic";
import Collapse from '@material-ui/core/Collapse';
import ReactDraggableList from 'react-draggable-list';
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover';

import PlaylistItemTemplate from './PlaylistItemTemplate.js'
import { shallowEqual } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        position: isDesktop=> isDesktop? 'relative': null,
        bottom: isDesktop=> isDesktop? 0 : null
    },
    draggablelistContainer: {
        overflow: 'auto',
        height: isDesktop => isDesktop ? '50vh' :'60vh',
        width: isDesktop => isDesktop ? '25vw' : null,
        margin: theme.spacing(),
    },
    buttonGroup: {
        width: '100%',
    },
    button: {
        width: '50%'
    }
}));

export default function PlaylistControl(props){

    const isDesktop = props.isDesktop

    const {
        playlist,
        shuffled,
        currentTrack
    } = useSelector(
        ({
            playlist,
            shuffled,
            currentTrack
        }) => ({
            playlist,
            shuffled,
            currentTrack
        }),
        shallowEqual
    )

    const dispatch = useDispatch();
    const onReorder = (newList, newIndex) =>{
        dispatch(actionCreators.updatePlaylist(newList))
        dispatch(actionCreators.changeTrack(newIndex))
    }
    const onShuffle = (bool) => dispatch(actionCreators.shuffle(bool))
    const onTrackSelect = (index) => dispatch(actionCreators.changeTrack(index))

    const classes = useStyles(isDesktop);
    const [values, setValues] = useState(shuffled ? ['shuffle']: []);
    const [expanded, expand] = useState(false);
    const [anchorEl, setAnchor] = useState(null)

    const handleChange = (event, newValues) => {
        event.stopPropagation()
        
        setValues(newValues);
        if (Boolean(newValues.find( element => element === 'show-playlist' ))){
            setAnchor(event.target.parentElement.parentElement)
            expand(true);
        }else expand(false)

        if (Boolean(newValues.find( element => element === 'shuffle' ))){
            onShuffle(true)
        }else onShuffle(false)
    };

    const handlePopoverClose = (event) => {
        const newValues = values.filter(value => value !== 'show-playlist')
        setValues(newValues);
        setAnchor(null)
        expand(false);
    };

    const draggablelistContainerRef = React.createRef();
    const reactDraggableList = (
        <Paper
        elevation='0'
        className={classes.draggablelistContainer}
        ref={draggablelistContainerRef}>
            <ReactDraggableList 
            list={playlist}
            itemKey='ID'
            template={PlaylistItemTemplate}
            onMoveEnd={(newList)=> {
                onReorder(
                    newList, 
                    newList.findIndex(
                        (track) => {
                            return track.ID === playlist[currentTrack].ID
                        }
                    )
                )}
            }
            container={()=> draggablelistContainerRef.current }
            commonProps={{
                listOfID: playlist.map((element) => element.ID),
                currentTrackID: playlist[currentTrack].ID,
                onTrackSelect: onTrackSelect
            }}
            />
        </Paper>
    )
                                
    return (
        <div className={classes.root}>

            {isDesktop?
            <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
                {reactDraggableList}
            </Popover>
            :
            <Collapse
            collapsedHeight={'0'}
            in={expanded}
            >
                {reactDraggableList}
            </Collapse>}

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