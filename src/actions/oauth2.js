export const oAuth2 = (firebase) =>  async dispatch => {
     firebase.auth().onAuthStateChanged(user => {
            dispatch({type:'FETCH_USER',payload:user});
    })      
}
