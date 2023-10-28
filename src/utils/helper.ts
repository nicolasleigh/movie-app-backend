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
