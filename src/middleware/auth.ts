import jwt from 'jsonwebtoken';
import { sendErr } from '../utils/helper.js';
import { User } from '../models/user.js';

export const isAuth = async (req, res, next) => {
    // const token = req.headers?.authorization;
    // if (!token) return sendErr(res, 'Invalid token!');
    // const jwtToken = token.split('Bearer ')[1];
    // const { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET!);
    // const user = User.findById(userId);
    // if (!user) return sendErr(res, 'user not found!', 404);
    // req.user = user;
    next();
};

export const isAdmin = async (req, res, next) => {
    const { user } = req;
    if (user.role !== 'admin')
        return sendErr(res, 'not administrator, unauthorized access');
    next();
};
