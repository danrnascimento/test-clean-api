import express from 'express';
import { UserController } from '../controllers/Users';
import { UserRepository } from '../repositories/User/implementation/TypeORM';
import { UserCases } from '../useCases/User';

const router = express.Router();

const repository = new UserRepository();
const userCases = new UserCases(repository);
const controller = new UserController(userCases);

router.post('/', controller.createUser);
router.get('/:userId', controller.getUserById);
router.post('/auth', controller.authenticate);

export default router;
