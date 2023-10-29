import { Actor } from '../models/actor.js';

//@ts-ignore
export const createActor = async (req, res, next) => {
    const { name, about, gender, avatarName } = req.body;
    const newActor = new Actor({
        name,
        gender,
    });

    if (about) {
        newActor.about = about;
    }

    if (avatarName) {
        const avatarObj = {
            name: avatarName,
            url: String(process.env.AVATAR_BASE_URL + avatarName),
        };
        newActor.avatar = avatarObj;
    }

    // console.log('newActor: ', newActor);
    await newActor.save();

    next();
};
