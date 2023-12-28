import * as express from 'express'
import articleController from '../controllers/articleController'

const router = express.Router()

router.get('/article', articleController.findAll)

export default router