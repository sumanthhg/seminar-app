import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Button from '@material-ui/core/Button';
import { oAuth2 } from '../actions/oauth2';
import { connect } from 'react-redux';
import firebase from '../Firebase'

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccess: () => false
    }
}
const OauthButton = (props) => {

    useEffect(() => {
        props.oAuth2();
    }, []);

    return (
        props.user ? <Button onClick={() => firebase.auth().signOut()} color="inherit">Logout</Button> :
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
    )
}

const mapStateToProps = (state) => {
    return { user: state.user }
}
export default connect(mapStateToProps, { oAuth2 })(OauthButton);