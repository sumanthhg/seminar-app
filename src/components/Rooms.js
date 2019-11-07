import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { getRoomsForUser } from '../actions/fetchRooms'
import { connect } from 'react-redux';
import { ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));


const Rooms = (props) => {
    const classes = useStyles();
    useEffect(() => {
        props.getRoomsForUser(props.user.uid);
    }, []);
    const getFormatedDate = (startDate) => {
        if(startDate instanceof Date){
            return `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`    
        }else{
            let date = new Date(startDate.seconds * 1000);
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`    
        }
      }

    const roomDetails = room => {

        return (
            <React.Fragment key={room.roomId} >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={room.roomName}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {`Created At`}
                                </Typography>
                                {`- ${getFormatedDate(room.startDate)}`}
                            </React.Fragment>
                        }
                    />
                    <ListItemSecondaryAction>
                    <PlayCircleFilledIcon style={{ width: '2rem' }} />
                    <EditIcon style={{ width: '2rem' }} />
                    <DeleteIcon style={{ width: '2rem' }} />
                    </ListItemSecondaryAction>
                    
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )

    }

    return (
        <List className={classes.root}>
            {
                props.rooms.map(room => (
                    roomDetails(room)
                ))
            }
        </List>
    )
}
const mapStateToProps = (state) => {
    return { rooms: state.rooms, user: state.user }
}
export default connect(mapStateToProps, { getRoomsForUser })(Rooms);