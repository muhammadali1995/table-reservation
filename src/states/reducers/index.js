import { combineReducers } from 'redux'
import user from './user'
import restaurant from './restaurant';
import tables from './table'
import reservations from "./reservation";

export default combineReducers({
    user,
    restaurant,
    tables,
    reservations
});