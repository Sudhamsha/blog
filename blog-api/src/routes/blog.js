import express from 'express';
import Blog from '../models/Blog';
import parseErrors from '../utils/parseErrors';
import jwtDecode from 'jwt-decode';

const router = express.Router();

router.get('/', (req, res) => {
  Blog.find({}, null, { sort: { _id: -1 } }, function(err, blogs) {
    res.json(blogs);
  });
});

router.post('/', (req, res) => {
  const { data } = req.body;
  const blog = new Blog({
    title: data.title,
    content: data.content,
    user: jwtDecode(data.user.token),
  });
  blog
    .save()
    .then(blogRecord => res.json({ blog: blogRecord }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  Blog.find({ _id: id }, function(err, blog) {
    res.json(blog[0]);
  });
});

export default router;
