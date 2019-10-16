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
import { connect } from 'react-redux';
import { oAuth2 } from '../actions/oauth2'
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

const App = (props) => {

    useEffect(() => {
        props.oAuth2(firebase);
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Seminar
                    </Typography>
                    {props.user ? <Button onClick={() => firebase.auth().signOut()} color="inherit">Logout</Button> : ''}
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={12}>
                    {
                        props.user ? <Dashboard user={props.user} /> :
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

const mapStateToProps = (state) => {
    return { user: state.user }
}
export default connect(mapStateToProps, { oAuth2 })(App);