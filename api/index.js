import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error Connecting to MongoDB', err);
    });

app.listen(5000, () => {
    console.log('listening on port 5000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
