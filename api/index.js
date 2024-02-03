import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

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

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    );
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(status).json({ success: false, error: message, status });
});
