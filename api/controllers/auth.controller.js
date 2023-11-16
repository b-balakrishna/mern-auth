import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password.toString(), 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        const response = await newUser.save();
        res.status(201).json({ message: 'User Created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                message: 'Username or email already exists',
            });
        } else {
            next(error);
        }
    }
};
