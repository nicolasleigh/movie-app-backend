import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            index: true,
        },
        about: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            trim: true,
            required: true,
        },
        avatar: {
            type: Object,
            name: String,
            url: String,
            required: true,
        },
    },
    { timestamps: true }
);

// actorSchema.index({ name: 'text' });

export const Actor = mongoose.model('Actor', actorSchema);
