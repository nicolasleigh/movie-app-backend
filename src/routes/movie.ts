import {
  createMovie,
  getLatestMovies,
  getSingleMovie,
  searchMovieByTitle,
  uploadMovieAndPoster,
} from '../controllers/movie.js';
import { isAuth } from '../middleware/auth.js';
import {
  fileSizeErrorHandler,
  movieAndPosterUpload,
  movieUpload,
  multerErrorHandler,
  posterUpload,
} from '../middleware/multer.js';
import { resizePoster } from '../middleware/resize.js';
import { test } from '../middleware/test.js';
import { transcode } from '../middleware/transcode.js';
import { router } from '../utils/expressRouter.js';
import { parseMovieData } from '../utils/helper.js';

router.get('/latest-movies', getLatestMovies);
router.get('/single/:movieId', getSingleMovie);
router.get('/search-movie', searchMovieByTitle);

router.post(
  '/upload-movie',
  movieUpload.single('video'),
  multerErrorHandler,
  (req: any, res: any) => {
    res.json({ movieName: req.body.movieName });
  },
  test
);
router.post(
  '/upload-poster',
  posterUpload.single('poster'),
  multerErrorHandler,
  resizePoster,
  // (req: any, res: any) => {
  //     res.json({ posterName: req.body.posterName });
  // },
  test
);

router.post(
  '/upload-movie-and-poster',
  movieAndPosterUpload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  transcode,
  resizePoster,
  // parseMovieData,
  uploadMovieAndPoster
);

router.post('/create-movie', createMovie);
export default router;
