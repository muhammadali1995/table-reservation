import {createStore} from 'redux';
import userReducer from "./reducers/userReducer";

function configureStore(state = {user: null}) {
    return createStore(userReducer, state);
}
export default configureStore;