import express from 'express';
import songRoute from './routes/song-route';

const app = express();

app.use(express.json());

app.use('/songs', songRoute);

export default app;