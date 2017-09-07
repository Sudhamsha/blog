import { ADD_BLOG, GET_ALL_BLOGS } from '../types';
import api from '../api';

export const addBlog = data => ({
    type: ADD_BLOG,
    data,
});

export const getBlogs = data => ({
    type: GET_ALL_BLOGS,
    data,
});

export const addNewBlog = data => dispatch =>
    api.blog.add(data).then(newData => {
        dispatch(addBlog(newData));
    });

export const getAllBlogs = () => dispatch =>
    api.blog.getAll().then(newData => {
        dispatch(getBlogs(newData));
    });