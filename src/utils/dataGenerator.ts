import axios from 'axios';
import fs from 'node:fs';
import FormData from 'form-data';
import { downloadFromUrl } from './downloadFromUrl.js';
// const maleAvatar = 'https://xsgames.co/randomusers/avatar.php?g=male';
// const femaleAvatar = 'https://xsgames.co/randomusers/avatar.php?g=female';
// const fakeUser = 'https://api.namefake.com/english/male/';

const filePathArr = [] as string[];
const gender = 'female';
const remoteServerURL = 'http://localhost:8000/api/actor/create-actor';

export const autoGenerateActor = async (gender: string) => {
    const fakeUser = `https://randomuser.me/api/?inc=gender,name,nat&nat=us&gender=${gender}`;

    try {
        const { data } = await axios.get(fakeUser);
        const user = data.results[0];

        const actorInfo = {
            name: user.name.first + ' ' + user.name.last,
            gender: user.gender,
        };
        return actorInfo;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data || error.message;
            console.log('Get error:', message);
        }
    }
};

const sendFileToServer = async (filePath: any, url: any) => {
    const actorInfo = await autoGenerateActor(gender);
    // console.log('actorInfo:', actorInfo);
    try {
        const form = new FormData();
        form.append('avatar', fs.createReadStream(filePath));
        form.append('actorInfo', JSON.stringify(actorInfo));

        const formDataHeaders = form.getHeaders();

        const response = await axios.post(url, form, {
            headers: {
                ...formDataHeaders,
            },
        });

        console.log('File successfully sent to the server:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data || error.message;
            console.log('Error sending the file:', message);
        }
    }
};

for (let i = 82; i < 100; i++) {
    filePathArr.push(
        `/Code/01PersonalProject/MovieApp/Movie-App-Backend/downloads/actors/actors${i}.jpg`
    );
}

// filePathArr.forEach((e) => {
//     sendFileToServer(e, remoteServerURL);
// });

const delay = async (item: string) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            sendFileToServer(item, remoteServerURL); // Or perform any operation here
            resolve();
        }, 5000); // Change the delay time in milliseconds (1000ms = 1 second)
    });
};

const executeWithDelay = async () => {
    for (const item of filePathArr) {
        await delay(item);
    }
};

executeWithDelay();

// const filePath =
//     '/Code/01PersonalProject/MovieApp/Movie-App-Backend/downloads/actors/man0.jpg';

// sendFileToServer(filePath, remoteServerURL);

const postActorInfo = async () => {
    const formData = new FormData();
    const response = await axios.post(
        'http://localhost:8000/api/acotr/create-actor'
    );
};

const downloadAvatar = () => {
    // 'https://randomuser.me/api/portraits/women/0.jpg'  // 0-99
    // 'https://randomuser.me/api/portraits/men/0.jpg'  // 0-99
    const urlArr = [];
    for (let i = 0; i < 100; i++) {
        const url = `https://randomuser.me/api/portraits/men/${i}.jpg`;
        urlArr.push(url);
    }
    // downloadFromUrl(urlArr);
};

const autoGenerateMovie = async () => {
    // title releaseYear actors language type public genres poster video description
};

const textGenerator = async () => {
    // const randomNumber = Math.round(Math.random() * 4);
    const options = {
        method: 'GET',
        url: 'https://montanaflynn-lorem-text-generator.p.rapidapi.com/paragraph',
        params: {
            count: '1',
            length: '3',
        },
        headers: {
            'X-RapidAPI-Key':
                '3edbbd2facmsh5270b259a12d9edp197758jsn8b4600e651c4',
            'X-RapidAPI-Host':
                'montanaflynn-lorem-text-generator.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
