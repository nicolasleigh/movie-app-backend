import { router } from '../utils/expressRouter.js';

router.get('/actors');
router.get('/search');

router.post('/create');

router.put('/update/:actorId');

router.delete('/delete/:actorId');

export default router;
