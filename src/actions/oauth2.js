import firebase from '../Firebase';

export const oAuth2 = () => async dispatch => {
    firebase.auth().onAuthStateChanged(user => {
        dispatch({ type: 'FETCH_USER', payload: user });
    })
}

