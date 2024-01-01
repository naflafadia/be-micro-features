import * as express from 'express'
import articleController from '../controllers/articleController'
import UploadFile from '../middlewares/UploadFile'

const router = express.Router()

router.get('/articles', articleController.findAll)
router.get('/article/:id', articleController.findOne)
router.post('/article', UploadFile.upload("picture"), articleController.create)

export default router