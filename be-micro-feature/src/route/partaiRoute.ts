import * as express from 'express'
import partaiController from '../controllers/partaiController'
import UploadFile from '../middlewares/UploadFile'

const router = express.Router();

router.get('/partais', partaiController.findAll);
router.get('/partai/:id', partaiController.findOne);
router.post('/partai', UploadFile.upload("picture"), partaiController.create);

export default router;