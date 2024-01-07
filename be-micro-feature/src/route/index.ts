import * as express from 'express'
import articleController from '../controllers/articleController'
import partaiController from '../controllers/partaiController'
import paslonController from '../controllers/paslonController'
import voteController from '../controllers/voteController'
import authController from '../controllers/authController'
import UploadFile from '../middlewares/UploadFile'
import AuthMiddleware from '../middlewares/Auth'

const router = express.Router();

// Route Article
router.get('/articles', AuthMiddleware.Auth, articleController.findAll)
router.get('/article/:id', articleController.findOne)
router.post('/article', UploadFile.upload("picture"), articleController.create)

// Route Partai
router.get('/partais', AuthMiddleware.Auth, partaiController.findAll);
router.get('/partai/:id', partaiController.findOne);
router.post('/partai', UploadFile.upload("picture"), partaiController.create);

// Route Paslon
router.get('/paslons', AuthMiddleware.Auth, paslonController.findAll);
router.get('/paslon/:id', paslonController.findOne);
router.post('/paslon', UploadFile.upload("picture"), paslonController.create);

// Route Vote
router.post('/vote', AuthMiddleware.Auth, voteController.create)
router.get('/vote', voteController.findAll)
router.get('/vote/:id', voteController.findOne)

// Route Auth
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth', AuthMiddleware.Auth, authController.findAll)
router.get('/auth/:id', authController.findOne)

export default router;