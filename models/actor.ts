import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            index: true,
        },
        avatarUrl: {
            type: String,
        },
        movie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    },
    { timestamps: true }
);

// actorSchema.index({ name: 'text' });

export const Actor = mongoose.model('Actor', actorSchema);
