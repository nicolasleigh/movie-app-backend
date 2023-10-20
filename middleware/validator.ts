import { body, validationResult } from 'express-validator';

export const validateUser = [
    body('name').trim().notEmpty().withMessage('Name is missing'),
    body('email')
        .trim()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is missing')
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be at least 4 characters'),
];

export const validateSignIn = [
    body('email')
        .trim()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email is invalid!'),
    body('password').trim().notEmpty().withMessage('Password is missing!'),
];

export const validatePassword = [
    body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('Password cannot empty')
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be at least 4 characters'),
];

export const validateResult = (req: any, res: any, next: any) => {
    const result = validationResult(req);
    if (!result.isEmpty) {
        const error = result.array({ onlyFirstError: true });
        return res.json({ error });
    }
    next();
};
