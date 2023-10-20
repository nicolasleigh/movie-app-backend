import crypto from 'node:crypto';

export const sendErr = (res: any, err: any, status = 400) => {
    res.status(status).json({ err });
};

export const generateRandomBytes = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(50, (err, buff) => {
            if (err) reject(err);
            resolve(buff.toString('hex'));
        });
    });
};
