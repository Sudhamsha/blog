import { ADD_BLOG } from '../types';
import api from '../api';

export const addBlog = data => ({
    type: ADD_BLOG,
    data,
});


export const addNewBlog = data => dispatch =>
    api.blog.add(data).then(newData => {
        dispatch(addBlog(newData));
    });
