import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
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
});

export const User = mongoose.model('User', userSchema);
