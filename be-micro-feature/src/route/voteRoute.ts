// voteRoute.ts
import * as express from 'express';
import voteController from '../controllers/voteController';
import UploadFile from '../middlewares/UploadFile';

const router = express.Router();

router.get('/votes', voteController.findAll);
router.get('/vote/:id', voteController.findOne);
router.post('/vote', UploadFile.upload('picture'), voteController.create);

export default router;
