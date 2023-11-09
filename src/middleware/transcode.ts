import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

console.log('ffmpegInstaller.path:', ffmpegInstaller.path);
console.log('ffmpegInstaller.version:', ffmpegInstaller.version);

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// ffmpeg()
//     .input('videos/video.mp4')
//     .videoCodec('libx264')
//     .audioCodec('aac')
//     .addOptions([
//         '-profile:v baseline',
//         '-level 3.0',
//         '-start_number 0',
//         '-hls_time 10',
//         '-hls_list_size 0',
//         '-f hls',
//     ])
//     .output('videos/output.m3u8')
//     .on('end', () => {
//         console.log('end');
//     })
//     .run();

ffmpeg()
    .input('videos/video.mp4')
    .videoCodec('libx264')
    .audioCodec('aac')
    .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-hls_segment_filename',
        'videos/720p/output%03d.ts', // Output for 720P
        '-f hls',
    ])
    .outputOptions([
        '-vf scale=-2:720', // Resizing to 720P
    ])
    .output('videos/720p/output.m3u8')
    .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-hls_segment_filename',
        'videos/480p/output%03d.ts', // Output for 480P
        '-f hls',
    ])
    .outputOptions([
        '-vf scale=-2:480', // Resizing to 480P
    ])
    .output('videos/480p/output.m3u8')
    .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-hls_segment_filename',
        'videos/360p/output%03d.ts', // Output for 480P
        '-f hls',
    ])
    .outputOptions([
        '-vf scale=-2:360', // Resizing to 480P
    ])
    .output('videos/360p/output.m3u8')
    .on('end', () => {
        console.log('end');
    })
    .run();
