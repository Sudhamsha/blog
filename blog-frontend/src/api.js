import axios from 'axios';

export default {
    user: {
        login: (credentials) => axios.post('/api/auth', { credentials }).then(res  => res.data.user),
    },
    blog: {
        getAll: () => axios.get('/api/blog').then(res  => res.data),
        add: (data) => axios.post('/api/blog', { data }).then(res  => res.data)
    }
};
