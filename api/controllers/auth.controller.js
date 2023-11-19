import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email }).lean();
        if (!validUser) return next(errorHandler(404, 'User not Found'));

        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword)
            return next(errorHandler(401, 'Invalid Credentials'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: hashedPassword, ...user } = validUser;
        const expires = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, { httpOnly: true }, expires)
            .status(200)
            .json(user);
    } catch (error) {
        next(error);
    }
};
