import express from 'express';
import { UserController } from './controller';

const router = express.Router();
const controller = new UserController();

router.get('/:userId', controller.getUserById);
router.post('/', controller.createUser);
router.patch('/', controller.patchUser);

export { router };
