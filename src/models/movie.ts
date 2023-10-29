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
            type: String,
            required: true,
        },
        genres: {
            type: [String],
            required: true,
            // enum: genres,
        },
        type: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            trim: true,
        },
        director: {
            type: String,
            trim: true,
        },
        actors: [
            {
                actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
                roleAs: String,
            },
        ],
        poster: {
            type: Object,
            url: String,
            name: String,
        },
        movie: {
            type: Object,
            url: String,
            name: String,
        },
        public: {
            type: Boolean,
            required: true,
        },
        review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        description: String,
    },
    { timestamps: true }
);

export const Movie = mongoose.model('Movie', movieSchema);
