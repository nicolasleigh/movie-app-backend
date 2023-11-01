import axios from 'axios';
import fs from 'node:fs';

export const downloadFromUrl = (downloadUrl: string[]) => {
    const downloadUrlWithoutNull = downloadUrl.filter(
        (e) => e !== null && e !== undefined
    );
    const filenameArr = downloadUrlWithoutNull.map((e) => {
        const url = e.split('/');
        return url[url.length - 1];
    });
    const outputPathArr = filenameArr.map(
        (e) =>
            '/Code/01PersonalProject/MovieApp/Movie-App-Backend/downloads/actors/man' +
            e
    );

    downloadUrlWithoutNull.forEach((url, index) => {
        axios({
            url: url,
            responseType: 'stream',
        })
            .then((response) => {
                response.data
                    .pipe(fs.createWriteStream(outputPathArr[index]))
                    .on('finish', () => {
                        console.log(
                            `Image downloaded to ${outputPathArr[index]}`
                        );
                    })
                    .on('error', (err: any) => {
                        console.error('Error writing the image:', err);
                    });
            })
            .catch((error) => {
                console.error('Error downloading the image:', error);
            });
    });
};
