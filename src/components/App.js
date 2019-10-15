import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from '../Firebase'
import Dashboard from './Dashboard';

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccess: () => false
    }
}
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const App = () => {
    const [isSignedIn, signIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            signIn(!!user)
            console.log("user", user)
        })
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Seminar
                    </Typography>
                    {   isSignedIn ? <Button onClick={() => firebase.auth().signOut()} color="inherit">Logout</Button> : '' }
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={12}>
                    {
                        isSignedIn ? <Dashboard user={firebase.auth().currentUser} /> :
                            <StyledFirebaseAuth
                                uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                    }
                </Grid>
            </Grid>
        </div>
    );
};
export default App;