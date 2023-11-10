import fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
// import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// console.log('ffmpegInstaller.path:', ffmpegInstaller.path);
// console.log('ffmpegInstaller.version:', ffmpegInstaller.version);

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfmpegPath('D:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe');

export const transcode = (req: any, res: any, next: any) => {
    const uploadVideoPath =
        '/Code/01PersonalProject/MovieApp/Movie-App-Backend/uploads/video/';

    const videoName = req.body.videoName;
    const inputPath = uploadVideoPath + videoName;
    const outputPath = uploadVideoPath;
    const dotIndex = videoName.lastIndexOf('.');
    const name = videoName.substring(0, dotIndex);

    const dir720p = outputPath + name + '/720p/';
    if (!fs.existsSync(dir720p)) {
        fs.mkdirSync(dir720p, { recursive: true });
    }
    const dir360p = outputPath + name + '/360p/';
    if (!fs.existsSync(dir360p)) {
        fs.mkdirSync(dir360p, { recursive: true });
    }

    ffmpeg(inputPath)
        .output(dir720p + 'output.m3u8')
        .videoCodec('libx264')
        .audioCodec('aac')
        .addOptions([
            '-profile:v baseline',
            '-level 3.0',
            '-start_number 0',
            '-hls_time 10',
            '-hls_list_size 0',
            `-hls_segment_filename ${dir720p}%03d.ts`,
            '-f hls',
        ])
        .outputOptions([
            '-vf scale=-2:720', // Resizing to 720P
        ])

        .output(dir360p + 'output.m3u8')
        .videoCodec('libx264')
        .audioCodec('aac')
        .addOptions([
            '-profile:v baseline',
            '-level 3.0',
            '-start_number 0',
            '-hls_time 10',
            '-hls_list_size 0',
            `-hls_segment_filename ${dir360p}%03d.ts`,
            '-f hls',
        ])
        .outputOptions([
            '-vf scale=-2:360', // Resizing to 360P
        ])
        .on('error', function (err, stdout, stderr) {
            console.log('An error occurred: ' + err.message, err, stderr);
            res.json({ error: err.message });
        })
        .on('end', () => {
            fs.unlinkSync(inputPath);
            console.log('end');
            next();
        })
        .run();
};
