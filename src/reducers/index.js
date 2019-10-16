import {combineReducers} from 'redux';
import userReducer from './oauth2'
export default combineReducers({
    user:userReducer
});