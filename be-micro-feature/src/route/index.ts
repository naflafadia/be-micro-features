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
router.get('/articles', articleController.getAll)
router.get('/article/:id', articleController.getOne)
router.post('/article', AuthMiddleware.Auth, UploadFile.upload("picture"), articleController.create)
router.patch("/article/:id", AuthMiddleware.Auth, UploadFile.upload("picture"), articleController.update)
router.delete("/article/:id", AuthMiddleware.Auth, articleController.delete)

// Route Partai
router.get('/partais', partaiController.getAll);
router.get('/partai/:id', partaiController.getOne);
router.post('/partai', AuthMiddleware.Auth, UploadFile.upload("picture"), partaiController.create);
router.patch("/partai/:id", AuthMiddleware.Auth, UploadFile.upload("picture"), partaiController.update)
router.delete("/partai/:id", AuthMiddleware.Auth, partaiController.delete)

// Route Paslon
router.get('/paslons', paslonController.getAll);
router.get('/paslon/:id', paslonController.getOne);
router.post('/paslon', AuthMiddleware.Auth, UploadFile.upload("picture"), paslonController.create);
router.patch("/paslon/:id", AuthMiddleware.Auth, UploadFile.upload("picture"), paslonController.update)
router.delete("/paslon/:id", AuthMiddleware.Auth, paslonController.delete)

// Route Vote
router.post('/vote', AuthMiddleware.Auth, voteController.create)
router.get('/votes', AuthMiddleware.Auth, voteController.getAll)
router.get('/vote/:id', voteController.getOne)

// Route Auth
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth', AuthMiddleware.Auth, authController.getAll)
router.get('/auth/:id', AuthMiddleware.Auth, authController.getOne)

export default router;