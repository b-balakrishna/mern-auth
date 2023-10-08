import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error Connecting to MongoDB', err);
    });

mongoose.connect();
app.listen(5000, () => {
    console.log('listening on port 5000');
});
