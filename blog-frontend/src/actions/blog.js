import { ADD_BLOG, GET_ALL_BLOGS, GET_BLOG, DELETED_BLOG } from '../types';
import api from '../api';

export const addBlog = data => ({
    type: ADD_BLOG,
    data,
});

export const getBlogs = data => ({
    type: GET_ALL_BLOGS,
    data,
});

export const getBlog = data => ({
    type: GET_BLOG,
    data,
});

export const deletedBlog = (data) => ({
    type: DELETED_BLOG,
    data
});

export const addNewBlog = data => dispatch =>
    api.blog.add(data).then(newData => {
        dispatch(addBlog(newData));
    });

export const updateBlog = data => dispatch =>
    api.blog.update(data).then(newData => {
        dispatch(dispatch(getBlog(newData)));
    });

export const getAllBlogs = () => dispatch =>
    api.blog.getAll().then(newData => {
        dispatch(getBlogs(newData));
    });

export const getBlogItem = id => dispatch =>
    api.blog.getBlog(id).then(blog => {
        dispatch(getBlog(blog));
    });

export const deleteItem = id => dispatch =>
    api.blog.delete(id).then((res) => {
        dispatch(deletedBlog(res.data));
    });