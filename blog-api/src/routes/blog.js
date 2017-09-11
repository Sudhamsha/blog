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

router.put('/', (req, res) => {
  const { data } = req.body;
  Blog.findOneAndUpdate(
    { _id: data._id },
    {
      title: data.title,
      content: data.content,
      user: jwtDecode(data.user.token),
    },
    { new: true },
  )
    .then(blogRecord => res.json({ data: blogRecord }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  Blog.find({ _id: id }, function(err, blog) {
    res.json({ data: blog[0] });
  });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findOneAndRemove({ _id: id }, function(err) {
        res.json({ data: "Blog has been deleted Successfully!" });
    });
});

export default router;
