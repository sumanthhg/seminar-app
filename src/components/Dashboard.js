import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
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
import { getRoomsForUser, createRoomsForUser } from '../actions/fetchRooms'
import { connect } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    userInfo: {
        textAlign: 'center'
    },
    room: {
        textAlign: 'center',
        cursor: 'pointer'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    }
}));

const Dashboard = (props) => {
    const classes = useStyles();
    // const ref = firebase.firestore().collection('rooms');
    const [open, setOpen] = React.useState(false);
    const [userType, setUserType] = React.useState('TEACHER');
    const [values, setValues] = React.useState({
        roomName: '',
        description: '',
        roomId: '',
    });
    useEffect(() => {
        props.getRoomsForUser(props.user.uid);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const handleClickOpen = (userType) => {
        setUserType(userType)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const { roomName, description, roomId } = values;
        const { uid, email } = props.user;
        const startDate = new Date();
        props.createRoomsForUser({ uid, email, roomName, description, roomId, startDate });
        props.getRoomsForUser(uid);
        setOpen(false);
    }
    const getFormatedDate = (startDate) => {
        let date = new Date(startDate.seconds * 1000);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12}>
                    <h1 className={classes.userInfo}>Hi {props.user.displayName}</h1>
                </Grid>
                <Grid style={{ padding: '2rem' }} item xs={12} sm={12} md={6}>
                    <h1 onClick={() => handleClickOpen('TEACHER')} className={classes.room}>Create Room</h1>

                    <List className={classes.root}>
                        {
                            props.rooms.map(room =>
                                (
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
                                            <PlayCircleFilledIcon style={{ width: '2rem' }} />
                                            <EditIcon style={{ width: '2rem' }} />
                                            <DeleteIcon style={{ width: '2rem' }} />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                )
                            )
                        }
                    </List>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                    <h1 onClick={() => handleClickOpen('STUDENT')} className={classes.room}>Join Room</h1>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Create New Room"}</DialogTitle>
                <DialogContent>
                    {
                        userType === 'TEACHER' ? <form onSubmit={onSubmit}>
                            <TextField
                                id="standard-name"
                                label="Room Name"
                                className={classes.textField}
                                value={values.roomName}
                                onChange={handleChange('roomName')}
                                margin="normal"
                            />
                            <TextField
                                id="standard-description"
                                multiline
                                label="Room Description"
                                className={classes.textField}
                                value={values.description}
                                onChange={handleChange('description')}
                                margin="normal"
                            />
                        </form> :
                            <form onSubmit={onSubmit}>
                                <TextField
                                    id="standard-roomid"
                                    label="Room Id"
                                    className={classes.textField}
                                    value={values.roomId}
                                    onChange={handleChange('roomId')}
                                    margin="normal"
                                />
                            </form>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} color="primary">
                        {userType === 'TEACHER' ? 'Create' : 'Join'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return { rooms: state.rooms }
}
export default connect(mapStateToProps, { getRoomsForUser, createRoomsForUser })(Dashboard);