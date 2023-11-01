import { Actor } from '../models/actor.js';
import { formateActor } from '../utils/helper.js';

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

    // next();
    return res.json({ avatarName });
};

export const searchActor = async (req: any, res: any) => {
    const { query } = req;
    const result = await Actor.find({
        name: { $regex: query.name, $options: 'i' },
    });

    const actors = result.map((actor) => formateActor(actor));

    res.json({ results: actors });
};
