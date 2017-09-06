import { ADD_BLOG } from '../types';

export default function blog(state = {}, action = {}) {
    switch (action.type) {
        case ADD_BLOG:
            return action.data;
        default:
            return state;
    }
}
