import multer, { MulterError } from 'multer';
import { sendErr } from '../utils/helper.js';

const maxMovieSize = 629145600; // 600MB
const maxPosterSize = 5242880; // 5MB

const movieStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(
            null,
            '/Code/01PersonalProject/MovieApp/Movie-App-Backend/uploads/movie'
        );
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split('/');
        let extension = extArray[extArray.length - 1];
        const fileName = file.fieldname + '-' + Date.now() + '.' + extension;
        req.body.movieName = fileName;
        cb(null, fileName);
    },
});

const posterStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(
            null,
            '/Code/01PersonalProject/MovieApp/Movie-App-Backend/uploads/poster'
        );
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split('/');
        let extension = extArray[extArray.length - 1];
        const fileName = file.fieldname + '-' + Date.now() + '.' + extension;
        req.body.posterName = fileName;
        cb(null, fileName);
    },
});

function movieFilter(req: any, file: any, cb: any) {
    if (!file.mimetype.startsWith('video')) {
        return cb('Only support video file!', false);
    }
    cb(null, true);
}

const posterFilter = function (req: any, file: any, cb: any) {
    if (!file.mimetype.startsWith('image')) {
        return cb('Only support image file!', false);
    }
    cb(null, true);
};

export const movieUpload = multer({
    storage: movieStorage,
    fileFilter: movieFilter,
    // limits: { fileSize: maxMovieSize },
});

export const posterUpload = multer({
    storage: posterStorage,
    fileFilter: posterFilter,
    // limits: { fileSize: maxPosterSize },
});

// @ts-ignore
export const multerErrorHandler = (err, req, res, next) => {
    if (err) res.status(400).json({ error: err });
    next();
};

// @ts-ignore
export const fileSizeErrorHandler = (err, req, res, next) => {
    if (err) return sendErr(res, 'File too large!');
    next();
};
