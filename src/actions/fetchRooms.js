import firebase from '../Firebase';

export const getRoomsForUser = (uid) => dispatch => {
    const roomsRef = firebase.firestore().collection('rooms').where("uid", "==", uid);
    roomsRef.get().then(function(querySnapshot) {
        let rooms = [];
            querySnapshot.forEach(function(doc) {
                rooms.push({...doc.data(),...{roomId:doc.id}});
            });
            dispatch({ type: 'FETCH_ROOMS', payload: rooms || [] });
        });
}

export const createRoomsForUser = (room) => dispatch => {
    const roomsRef = firebase.firestore().collection('rooms');
    roomsRef.add(room).then((docRef) => { 
        dispatch({ type: 'CREATE_ROOM', payload: {...room, roomId:docRef.id} });
    }).catch((error) => {
                console.error("Error adding document: ", error);
        });
}