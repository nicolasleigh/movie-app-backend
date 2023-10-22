import { isValidObjectId } from 'mongoose';
import { EmailVerificationToken } from '../models/emailVerificationToken.js';
import { User } from '../models/user.js';
import { generateRandomBytes, sendErr } from '../utils/helper.js';
import { sendResetPassUrl, sendToken } from '../utils/mail.js';

export const createUser = async (req: any, res: any) => {
    const { name, email, password } = req.body;
    const sameEmail = await User.findOne({ email });
    if (sameEmail) return sendErr(res, 'Email already exists!');

    const newUser = new User({ name, email, password });
    await newUser.save();

    sendToken(newUser);

    res.status(201).json({
        message: 'OK',
        // TODO
    });
};

export const verifyEmail = async (req: any, res: any) => {
    const { userId, OTP } = req.body;

    if (!isValidObjectId(userId)) return sendErr(res, 'Invalid userId!');
    const user = await User.findById(userId);
    if (!user) return sendErr(res, 'User not found!', 404);
    if (user.isVerified) return sendErr(res, 'User is already verified!');

    const token = await EmailVerificationToken.findOne({ user: userId });
    if (!token) return sendErr(res, 'Token not found!', 404);

    const sameToken = await token.isSameToken(OTP);
    if (!sameToken) return sendErr(res, 'Token not match!');

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    res.status(200).json({
        message: 'OK',
        // TODO
    });
};

export const resendEmailVerificationToken = async (req: any, res: any) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return sendErr(res, 'User not found!', 404);
    if (user.isVerified) return sendErr(res, 'User is already verified!');

    const alreadyHasToken = await EmailVerificationToken.findOne({
        user: userId,
    });
    if (alreadyHasToken)
        return sendErr(res, 'Only after 10 minutes can resend another token!');

    await sendToken(user);

    res.status(200).json({
        message: 'OK',
        // TODO
    });
};

export const forgetPassword = async (req: any, res: any) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendErr(res, 'User not found!', 404);

    const randomBytes = await generateRandomBytes();

    sendResetPassUrl(user, randomBytes);

    res.status(200).json({
        message: 'OK',
        // TODO
    });
};

export const resetPassword = async (req: any, res: any) => {
    const { newPassword, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return sendErr(res, 'User not found');
    const samePassword = await user.isSamePassword(newPassword);
    if (samePassword)
        return sendErr(
            res,
            'New password must be different from old password!'
        );
    user.password = newPassword;
    await user.save();

    res.status(200).json({
        message: 'OK',
        // TODO
    });
};

export const signIn = async (req: any, res: any) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendErr(res, 'Email or Password is incorrect!', 404);
    const samePassword = await user.isSamePassword(password);
    if (!samePassword)
        return sendErr(res, 'Email or Password is incorrect!', 404);

    res.status(200).json({
        message: 'OK',
        // TODO
    });
};

export const updateUser = async (req: any, res: any) => {
    const { name, bio, avatarUrl, userId } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, bio, avatarUrl });
    if (!user) return sendErr(res, 'User not found', 404);

    res.status(200).json({
        message: 'OK',
        // TODO
    });
};

export const deleteUser = async (req: any, res: any) => {
    const { userId } = req.body;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return sendErr(res, 'User not found', 404);

    res.status(200).json({
        message: 'OK',
        // TODO
    });
};
