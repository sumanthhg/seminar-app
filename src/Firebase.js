import firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDLfKedL082TNSpfxGTzuSgJDobwe7RsgM",
    authDomain: "seminar-app-de2bd.firebaseapp.com",
    databaseURL: "https://seminar-app-de2bd.firebaseio.com",
    projectId: "seminar-app-de2bd",
    storageBucket: "seminar-app-de2bd.appspot.com",
    messagingSenderId: "38500772764",
    appId: "1:38500772764:web:da1ad9c28e63f9fcebb659",
    measurementId: "G-N4Y0T7V9T1"
};
firebase.initializeApp(config);

firebase.firestore();

export default firebase;