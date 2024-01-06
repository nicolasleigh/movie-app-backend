import test from 'node:test';
import { createActor, searchActor } from '../controllers/actor.js';
import { avatarUpload, multerErrorHandler } from '../middleware/multer.js';
import { router } from '../utils/expressRouter.js';
import { parseActorData } from '../utils/helper.js';
import { resizeAvatar } from '../middleware/resize.js';

router.get('/actors');
router.get('/search-actor', searchActor);

// router.post('/upload-avatar');
router.post(
  '/create-actor',
  avatarUpload.single('avatar'),
  // multerErrorHandler,
  //   resizeAvatar,
  parseActorData,
  createActor
);

router.put('/update/:actorId');

router.delete('/delete/:actorId');

export default router;
