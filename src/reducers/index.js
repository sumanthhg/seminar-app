import {combineReducers} from 'redux';
import userReducer from './oauth2'
import roomReducer from './fetchRooms'
export default combineReducers({
    user:userReducer,
    rooms:roomReducer
});