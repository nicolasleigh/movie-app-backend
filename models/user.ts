import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema<any>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'superUser', 'admin'],
    },
    avatarUrl: {
        type: String,
    },
    bio: {
        type: String,
        required: true,
        default: '',
    },
});

userSchema.pre('save', async function (next) {
    const thisDocument = this;
    if (thisDocument.isModified('password')) {
        thisDocument.password = await bcrypt.hash(thisDocument.password, 8);
    }
    next();
});

userSchema.method('isSamePassword', async function (password) {
    const thisDocument = this;
    return await bcrypt.compare(password, thisDocument.password);
});

export const User = mongoose.model('User', userSchema);
