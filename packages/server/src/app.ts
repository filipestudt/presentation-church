import express from 'express';
import cors from 'cors';
import songRoute from './routes/song-route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/songs', songRoute);

export default app;