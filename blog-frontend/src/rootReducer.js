import { combineReducers } from 'redux';

import user from './reducers/user';
import blog from './reducers/blog';

export default combineReducers({
    user,
    blog,
});
