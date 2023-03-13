import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRouter from './routes/auth.router';
import eventRouter from './routes/event.router';

const app = express();
dotenv.config();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', [
    authRouter,
    eventRouter,
]);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server started on port 4000');
});

export default app;