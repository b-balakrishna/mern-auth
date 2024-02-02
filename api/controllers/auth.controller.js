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
        const expires = new Date();
        expires.setUTCHours(expires.getUTCHours() + 1);
        return res
            .cookie('access_token', token, {
                httpOnly: true,
                expires: expires,
            })
            .status(200)
            .json({
                message: 'User Successfully logged In',
                data: user,
                date: expires,
            });
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name, photoUrl, provider } = req.body;
    try {
        const user = await User.findOne({ email }).lean();
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...userData } = user;
            const expires = new Date();
            expires.setUTCHours(expires.getUTCHours() + 1);
            return res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expires,
                })
                .status(200)
                .json({
                    message: 'User Successfully logged In',
                    data: userData,
                    date: expires,
                });
        }
        const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const username =
            name.split(' ').join('').toLowerCase() +
            Math.floor(Math.random() * 10000).toString();
        const newUserData = {
            username,
            email,
            profilePicture: photoUrl,
            provider,
            password: hashedPassword,
        };
        const userObj = new User(newUserData);
        const newUser = await userObj.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password, ...userData } = newUser._doc;
        const expires = new Date();
        expires.setUTCHours(expires.getUTCHours() + 1);
        return res
            .cookie('access_token', token, {
                httpOnly: true,
                expires: expires,
            })
            .status(200)
            .json({
                message: 'User Successfully Signed Up',
                data: userData,
                date: expires,
            });
    } catch (error) {
        console.log(error);
        res.json({ message: 'ERROR', data: error });
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
            .status(200)
            .json({ message: 'Signout Success', success: true });
    } catch (error) {
        next(error);
    }
};
