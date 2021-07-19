import { createStore } from 'redux';
import reducer from './reducers/index';
import user from './reducers/user';

function configureStore() {
    return createStore(reducer);
}
export default configureStore;