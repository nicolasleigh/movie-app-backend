import crypto from 'node:crypto';

export const sendErr = (res: any, error: any, status = 400) => {
    res.status(status).json({ error });
};

export const generateRandomBytes = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(50, (err, buff) => {
            if (err) reject(err);
            resolve(buff.toString('hex'));
        });
    });
};

// @ts-ignore
export const parseActorData = (req, res, next) => {
    const actorInfo = JSON.parse(req.body.actorInfo);
    req.body.name = actorInfo.name;
    req.body.gender = actorInfo.gender;
    req.body.about = actorInfo.about;
    next();
};

export const formateActor = (actor: any) => {
    const { name, gender, about, _id, avatar } = actor;
    return {
        id: _id,
        name,
        about,
        gender,
        avatar: avatar?.url,
    };
};


