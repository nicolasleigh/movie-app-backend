import fs from 'node:fs';
import { downloadFromUrl } from './downloadFromUrl.js';

const jsonFilePath = './data.json';
let jsonObject = {} as any;

const parseToJS = () => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            jsonObject = JSON.parse(data);
            const trailerArr = jsonObject.films.map((e: any) => e.film_trailer);
            const posterArr = jsonObject.films.map(
                (e: any) => e.images.poster?.[1]?.medium.film_image
            );
            const landscapeArr = jsonObject.films.map(
                (e: any) => e.images.still?.[1]?.medium.film_image
            );
            // downloadFromUrl(trailerArr);
            // downloadFromUrl(posterArr);
            // downloadFromUrl(landscapeArr);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
};

parseToJS();
