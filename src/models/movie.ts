import mongoose from 'mongoose';
import { genres } from '../utils/genre.js';

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
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
        actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
        poster: {
            type: Object,
            name: String,
            // url: [String],
            // name: [String],
        },
        video: {
            type: Object,
            // url: String,
            name: String,
        },
        isPublic: {
            type: Boolean,
            default: true,
            required: true,
        },
        review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        description: String,
    },
    { timestamps: true }
);

export const Movie = mongoose.model('Movie', movieSchema);
