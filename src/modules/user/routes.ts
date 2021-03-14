import express from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../../models/User';
import { UserController } from './controller';

const router = express.Router();
const controller = new UserController();

router.post('/', controller.createUser);
router.get('/:userId', controller.getUserById);
// router.patch('/:userId', controller.patchUser);

export { router };
