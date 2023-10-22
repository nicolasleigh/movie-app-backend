// @ts-ignore
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import userRouter from './src/routes/user.js';
import actorRouter from './src/routes/actor.js';
import movieRouter from './src/routes/movie.js';
import reviewRouter from './src/routes/review.js';
import superUserRouter from './src/routes/superUser.js';
import adminRouter from './src/routes/admin.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/api/user', userRouter);
app.use('/api/actor', actorRouter);
app.use('/api/movie', movieRouter);
app.use('/api/review', reviewRouter);
app.use('/api/super-user', superUserRouter);
app.use('/api/admin', adminRouter);

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log('Database is connected!'))
    .catch((e) => console.log('Database failed! Error: ', e));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server stared at port ${PORT}`));
