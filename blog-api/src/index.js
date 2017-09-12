import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import morgan from 'morgan';

import auth from './routes/auth';
import blog from './routes/blog';

dotenv.config();
const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('tiny'));
}

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app.use(express.static('build'));
app.use('/api/auth', auth);
app.use('/api/blog', blog);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(8181, () => console.log('Listening on 8181!')); // eslint-disable-line
