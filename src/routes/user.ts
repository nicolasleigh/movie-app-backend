import {
    createUser,
    deleteUser,
    forgetPassword,
    resendEmailVerificationToken,
    resetPassword,
    signIn,
    updateUser,
    verifyEmail,
} from '../controllers/user.js';
import {
    validatePassword,
    validateResult,
    validateSignIn,
    validateUser,
} from '../middleware/validator.js';
import { router } from '../utils/expressRouter.js';

router.get('/is-auth');

router.post('/create-user', validateUser, validateResult, createUser);
router.post('/sign-in', validateSignIn, validateResult, signIn);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-token', resendEmailVerificationToken);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', validatePassword, validateResult, resetPassword);
router.post('/verify-reset-pass-token');

router.put('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;
