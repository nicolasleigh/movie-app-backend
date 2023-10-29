import test from 'node:test';
import { createActor } from '../controllers/actor.js';
import { avatarUpload, multerErrorHandler } from '../middleware/multer.js';
import { router } from '../utils/expressRouter.js';
import { parseActorData } from '../utils/helper.js';

router.get('/actors');
router.get('/search');

// router.post('/upload-avatar');
router.post(
    '/create-actor',
    avatarUpload.single('avatar'),
    multerErrorHandler,
    parseActorData,
    createActor,
    (req: any, res: any) => {
        res.json({ avatarName: req.body.avatarName });
    }
);

router.put('/update/:actorId');

router.delete('/delete/:actorId');

export default router;
