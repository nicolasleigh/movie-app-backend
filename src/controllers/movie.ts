import mongoose, { isValidObjectId } from 'mongoose';
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
        public: isPublic,
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
        console.log('actors: ', actors);
        const actorsObjId = actors.map(
            (e: any) => new mongoose.Types.ObjectId(e)
        );
        console.log('actorsObjId: ', actorsObjId);
        newMovie.actors = actorsObjId;
    }
    if (description) {
        newMovie.description = description;
    }

    if (poster) {
        const nameArr: string[] = [];
        const urlArr: string[] = [];
        poster.forEach((p: string) => {
            nameArr.push(p);
            urlArr.push(String(process.env.POSTER_BASE_URL + p));
        });
        const posterObj = {
            name: nameArr,
            url: urlArr,
        };
        newMovie.poster = posterObj;
    }

    if (video) {
        const videoObj = {
            name: video,
            url: String(process.env.MOVIE_BASE_URL + video),
        };
        newMovie.video = videoObj;
    }

    console.log('newMovie: ', newMovie);

    await newMovie.save();
};

export const getLatestMovies = async (req: any, res: any) => {
    const { limit = 5 } = req.query;
    const results = await Movie.find({})
        .sort('-createdAt')
        .limit(parseInt(limit));

    const movies = results.map((movie) => ({
        id: movie._id,
        title: movie.title,
        poster: movie.poster.url,
        // description: movie.description,
    }));
    res.json({ movies });
};

export const getSingleMovie = async (req: any, res: any) => {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId).populate('director, actors');

    // const review = getAverageRating(movie._id)

    const {
        _id: id,
        title,
        language,
        genres,
        releaseYear,
        actors,
        director,
        type,
        public: isPublic,
        description,
        poster,
        tags,
        video,
    }: any = movie;

    res.json({
        movie: {
            id,
            title,
            language,
            genres,
            releaseYear,
            actors,
            director,
            type,
            isPublic,
            description,
            poster: poster?.url,
            video: video?.url,
            tags,
        },
    });
};
