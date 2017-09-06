import express from 'express';
import Blog from '../models/Blog';

const router = express.Router();

router.post('/', (req, res) => {
    const { data } = req.body;
    res.status(200).json({ data: data });
});

export default router;
