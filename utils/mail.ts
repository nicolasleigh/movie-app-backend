import nodemailer from 'nodemailer';
import { EmailVerificationToken } from '../models/emailVerificationToken.js';

export const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const generateOTP = (length = 4) => {
    let OTP = '';
    for (let i = 1; i <= length; i++) {
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal;
    }
    return OTP;
};

export const sendToken = async (newUser: any) => {
    const OTP = generateOTP(4);
    const newEmailVerificationToken = new EmailVerificationToken({
        user: newUser._id,
        token: OTP,
    });
    await newEmailVerificationToken.save();

    await transport
        .sendMail({
            from: 'nicolas@test.com',
            to: newUser.email,
            subject: 'Email Verification',
            html: `
       <p> Your Verification Token </p>
       <h1>${OTP}</h1>
        `,
        })
        .catch((e) => console.error('Can not send email, err: ', e));
};

export const sendResetPassUrl = (user: any, randomBytes: any) => {
    const resetPasswordUrl = `http://localhost:5173/auth/reset-password?token=${randomBytes}&id=${user._id}`;

    transport
        .sendMail({
            from: 'security@movieApp.com',
            to: user.email,
            subject: 'Reset Password Link',
            html: `
    <p>Click here to reset password</p>
    <a href="${resetPasswordUrl}">Reset Password</a>
    `,
        })
        .catch((e) => console.error('Can not send email, err: ', e));
};
