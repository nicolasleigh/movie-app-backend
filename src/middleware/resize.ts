import sharp from 'sharp';
import fs from 'node:fs';

// @ts-ignore
export const resizePoster = async (req, res) => {
    await sharp(req.file.path)
        .resize(1360, 1360)
        .toFile(
            '/Code/01PersonalProject/MovieApp/Movie-App-Backend/uploads/poster' +
                '/resized-' +
                req.body.posterName,
            function (err) {
                if (err) {
                    return res.json({ error: 'resize poster failed!' });
                }
                res.json({ posterName: 'resized-' + req.body.posterName });
            }
        );
    // fs.unlinkSync(req.file.path);
};

// var image = 'photos/pic';
// var sizes = [1440, 1080, 720, 480];

// for (var i = 0; i < sizes.length; i++) {
//     sharp(image + '.jpg')
//     .resize(sizes[i], sizes[i])
//     .toFile(image + '-' + sizes[i] + '.jpg');
// }
