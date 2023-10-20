import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const emailVerificationTokenSchema = new mongoose.Schema<any>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 600, // 10 minutes
        default: Date.now,
    },
});

emailVerificationTokenSchema.pre('save', async function (next) {
    const thisDocument = this;
    if (thisDocument.isModified('token')) {
        thisDocument.token = await bcrypt.hash(thisDocument.token, 8);
    }
    next();
});

emailVerificationTokenSchema.method('isSameToken', async function (token) {
    const thisDocument = this;
    return await bcrypt.compare(token, thisDocument.token);
});

export const EmailVerificationToken = mongoose.model(
    'EmailVerificationToken',
    emailVerificationTokenSchema
);
