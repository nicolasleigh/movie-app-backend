import mongoose, { isValidObjectId } from 'mongoose';
import { Movie } from '../models/movie.js';
import { formatMovie, sendErr } from '../utils/helper.js';

export const createMovie = async (req: any, res: any) => {
  const { file, body } = req;
  // console.log('file: ', file);
  let {
    title,
    desc,
    tags,
    director,
    actor,
    releaseYear,
    language,
    type,
    genre,
    poster,
    video,
  } = body;

  releaseYear = new Date(releaseYear).getFullYear();

  const newMovie = new Movie({
    title,
    language: language.value,
    type: type.value,
    genres: genre.value,
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
  if (actor) {
    // console.log('actors: ', actors);
    const actorsObjId = actor.map(
      (e: any) => new mongoose.Types.ObjectId(e.id)
    );
    // console.log('actorsObjId: ', actorsObjId);
    newMovie.actors = actorsObjId;
  }
  if (desc) {
    newMovie.description = desc;
  }

  // if (poster) {
  //     const nameArr: string[] = [];
  //     const urlArr: string[] = [];
  //     poster.forEach((p: string) => {
  //         nameArr.push(p);
  //         urlArr.push(String(process.env.POSTER_BASE_URL + p));
  //     });
  //     const posterObj = {
  //         name: nameArr,
  //         url: urlArr,
  //     };
  //     newMovie.poster = posterObj;
  // }

  // if (video) {
  //     const videoObj = {
  //         name: video,
  //         url: String(process.env.MOVIE_BASE_URL + video),
  //     };
  //     newMovie.video = videoObj;
  // }

  // console.log('newMovie: ', newMovie);

  await newMovie.save();
  res.json({ movie: newMovie });
};

export const getLatestMovies = async (req: any, res: any) => {
  const { limit = 20 } = req.query;
  const results = await Movie.find({})
    .sort('-createdAt')
    .limit(parseInt(limit));

  const movies = results.map((movie) => ({
    id: movie._id,
    title: movie.title,
    poster: movie.poster.name,
    // description: movie.description,
  }));
  res.json({ movies });
};

export const getSingleMovie = async (req: any, res: any) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId))
    return res.status(404).json({ error: 'Invalid Id' });
  // if (!isValidObjectId(movieId)) return sendErr(res, 'Invalid Id!', 404);

  // const movie = await Movie.findById(movieId);
  const movie = await Movie.findById(movieId).populate('actors');

  // const review = getAverageRating(movie._id)

  const {
    _id: id,
    title,
    language,
    genres,
    releaseYear,
    actors,
    type,
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
      type,
      description,
      poster: poster?.name,
      video: video?.name,
      tags,
    },
  });
};

export const searchMovieByTitle = async (req: any, res: any) => {
  const { title } = req.query;

  if (!title) return sendErr(res, 'Invalid requests!');

  const result = await Movie.find({
    title: { $regex: title, $options: 'i' },
  });

  const movies = result.map((movie) => formatMovie(movie));

  res.json({ results: movies });
};

export const uploadMovieAndPoster = async (req: any, res: any) => {
  // console.log('req.body.movieId:', req.body.movieId);
  let { movieId, posterName, videoName } = req.body;
  movieId = new mongoose.Types.ObjectId(req.body.movieId);

  const posterObj = {
    name: posterName,
  };
  const videoObj = {
    name: videoName,
  };
  const updatedMovie = await Movie.findByIdAndUpdate(
    movieId,
    {
      poster: posterObj,
      video: videoObj,
    },
    {
      returnDocument: 'after',
    }
  );
  //   console.log('updatedMovie:', updatedMovie);

  // req.body.videoName;
  // req.body.posterName;
  // console.log('req.files:', req.files);
  return res.json({ message: 'ok' });
};
