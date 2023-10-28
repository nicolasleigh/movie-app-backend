import { isValidObjectId } from 'mongoose';
import { Movie } from '../models/movie.js';
import { sendErr } from '../utils/helper.js';

export const createMovie = async (req: any, res: any) => {
    const { file, body } = req;
    // console.log('file: ', file);
    // console.log('body: ', body);
    let {
        title,
        description,
        tags,
        director,
        actors,
        releaseYear,
        public: isPublic,
        language,
        type,
        genres,
        poster,
        video,
    } = body;

    releaseYear = new Date(releaseYear).getFullYear();

    const newMovie = new Movie({
        title,
        isPublic,
        language,
        type,
        genres,
        releaseYear,
    });

    // if (director) {
    //     if (!isValidObjectId(director))
    //         return sendErr(res, 'Invalid director id!');
    //     newMovie.director = director;
    // }

    if (tags) {
        newMovie.tags = tags;
    }
    if (actors) {
        newMovie.actors = actors;
    }
    if (description) {
        newMovie.description = description;
    }

    if (poster) {
        const posterObj = {
            name: poster,
            url: String(process.env.POSTER_BASE_URL + poster),
        };
        newMovie.poster = posterObj;
    }

    if (video) {
        const videoObj = {
            name: video,
            url: String(process.env.MOVIE_BASE_URL + video),
        };
        newMovie.movie = videoObj;
    }

    console.log('newMovie: ', newMovie);

    await newMovie.save();
};
