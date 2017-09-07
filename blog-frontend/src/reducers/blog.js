import { ADD_BLOG, GET_ALL_BLOGS } from '../types';

export default function blog(state = {}, action = {}) {
    switch (action.type) {
        case GET_ALL_BLOGS:
            return action.data;
        case ADD_BLOG:
            return action.data;
        default:
            return state;
    }
}
