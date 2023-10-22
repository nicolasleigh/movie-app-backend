import mongoose from 'mongoose';
import { genres } from '../utils/genre.js';

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        releaseYear: {
            type: Number,
            required: true,
        },
        genre: {
            type: [String],
            required: true,
            enum: genres,
        },
        tag: {
            type: [String],
            trim: true,
        },
        director: {
            type: String,
            trim: true,
        },
        cast: [
            {
                actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
                roleAs: String,
            },
        ],
        posterUrl: {
            type: String,
        },
        movieUrl: {
            type: String,
        },
        review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        description: String,
    },
    { timestamps: true }
);

export const Movie = mongoose.model('Movie', movieSchema);
