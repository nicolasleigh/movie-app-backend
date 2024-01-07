import fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import shell from 'shelljs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// console.log('ffmpegInstaller.path:', ffmpegInstaller.path);
// console.log('ffmpegInstaller.version:', ffmpegInstaller.version);

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// ffmpeg.setFfmpegPath('D:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe');
ffmpeg.setFfmpegPath('/opt/homebrew/bin/ffmpeg');

export const transcode = (req: any, res: any, next: any) => {
  const uploadVideoPath = path.join(__dirname, '../..', '/uploads/movie/');

  const videoName = req.body.videoName;
  const inputPath = uploadVideoPath + videoName;
  const outputPath = uploadVideoPath;
  const dotIndex = videoName.lastIndexOf('.');
  const name = videoName.substring(0, dotIndex);

  // const dir720p = outputPath + name + '/720p/';
  // if (!fs.existsSync(dir720p)) {
  //     fs.mkdirSync(dir720p, { recursive: true });
  // }
  // const dir360p = outputPath + name + '/360p/';
  // if (!fs.existsSync(dir360p)) {
  //     fs.mkdirSync(dir360p, { recursive: true });
  // }
  const dir = outputPath + name;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  shell.exec(
    `ffmpeg -i ${inputPath} \
-filter_complex \
"[0:v]split=2[v1][v2]; \
[v1]scale=w=1280:h=720[v1out]; [v2]scale=w=640:h=360[v2out]" \
-map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 1500k -maxrate:v:0 2000k  -bufsize:v:0 3000k -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
-map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 400k -maxrate:v:1 600k  -bufsize:v:1 800k -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
-map a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
-map a:0 -c:a:1 aac -b:a:1 48k -ac 2 \
-f hls \
-hls_time 10 \
-hls_playlist_type vod \
-hls_flags independent_segments \
-hls_segment_type mpegts \
-hls_segment_filename ${outputPath + name + '/'}%v_data%03d.ts \
-master_pl_name master.m3u8 \
-var_stream_map "v:0,a:0 v:1,a:1" ${outputPath + name + '/'}%v.m3u8`,
    { async: true }
  );

  // ffmpeg(inputPath)
  //     .output(dir720p + 'output.m3u8')
  //     .videoCodec('libx264')
  //     .audioCodec('aac')
  //     .addOptions([
  //         '-profile:v baseline',
  //         '-level 3.0',
  //         '-start_number 0',
  //         '-hls_time 10',
  //         '-hls_list_size 0',
  //         `-hls_segment_filename ${dir720p}%03d.ts`,
  //         '-f hls',
  //     ])
  //     .outputOptions([
  //         '-vf scale=-2:720', // Resizing to 720P
  //     ])

  //     .output(dir360p + 'output.m3u8')
  //     .videoCodec('libx264')
  //     .audioCodec('aac')
  //     .addOptions([
  //         '-profile:v baseline',
  //         '-level 3.0',
  //         '-start_number 0',
  //         '-hls_time 10',
  //         '-hls_list_size 0',
  //         `-hls_segment_filename ${dir360p}%03d.ts`,
  //         '-f hls',
  //     ])
  //     .outputOptions([
  //         '-vf scale=-2:360', // Resizing to 360P
  //     ])
  //     .on('error', function (err, stdout, stderr) {
  //         console.log('An error occurred: ' + err.message, err, stderr);
  //         res.json({ error: err.message });
  //     })
  //     .on('end', () => {
  //         fs.unlinkSync(inputPath);
  //         console.log('end');
  //         next();
  //     })
  //     .run();

  next();
};
