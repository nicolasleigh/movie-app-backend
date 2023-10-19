import { router } from '../utils/expressRouter.js';

router.get('/is-auth');

router.post('/create');
router.post('/sign-in');
router.post('/verify-email');
router.post('/resend-email-token');
router.post('/forget-password');
router.post('/reset-password');
router.post('/reset-password-token');

router.put('/update/:userId');
router.delete('/delete/:userId');

export default router;
