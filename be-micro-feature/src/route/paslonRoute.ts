import * as express from 'express'
import paslonController from '../controllers/paslonController'
import UploadFile from '../middlewares/UploadFile'

const router = express.Router();

router.get('/paslons', paslonController.findAll);
router.get('/paslon/:id', paslonController.findOne);
router.post('/paslon', UploadFile.upload("picture"), paslonController.create);

export default router;