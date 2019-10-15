import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

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
    const [open, setOpen] = React.useState(false);
    const [userType, setUserType] = React.useState('TEACHER');
    const [values, setValues] = React.useState({
        name: '',
        description: '',
        roomId: '',
    });
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
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12}>
                    <h1 className={classes.userInfo}>Hi {props.user.displayName}</h1>
                </Grid>
                <Grid item  xs={12} sm={12} md={6}>
                    <h1 onClick={() => handleClickOpen('TEACHER')} className={classes.room}>Create Room</h1>
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
                    <DialogContentText id="alert-dialog-slide-description">
                        {
                            userType === 'TEACHER' ? <div>
                                <TextField
                                    id="standard-name"
                                    label="Room Name"
                                    className={classes.textField}
                                    value={values.name}
                                    onChange={handleChange('name')}
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
                            </div> :
                                <TextField
                                    id="standard-roomid"
                                    label="Room Id"
                                    className={classes.textField}
                                    value={values.roomId}
                                    onChange={handleChange('roomId')}
                                    margin="normal"
                                />
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {userType === 'TEACHER' ? 'Create' : 'Join'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Dashboard;