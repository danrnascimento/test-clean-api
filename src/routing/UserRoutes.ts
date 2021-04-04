import express from 'express';
import { UserController } from '../controllers/Users';

const router = express.Router();
const controller = new UserController();

router.post('/', controller.createUser);
router.get('/:userId', controller.getUserById);
router.post('/auth', controller.auth);

export default router;
