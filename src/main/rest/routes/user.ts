import { Router, Express } from 'express';
import { expressRouterAdapter } from '@/infra/adapters/express_adapter';
import {
  makeCreateUserRoute,
  makeGetUserRoute,
  makeUpdateUserPasswordRoute,
  makeUpdateUserUsernameRoute,
} from '@/main/factories/userRoutes';

export const userRoutes = (app: Express) => {
  const router = Router();

  router.post('/', makeCreateUserRoute());
  router.get('/:id', makeGetUserRoute());
  router.patch('/password/:id', makeUpdateUserPasswordRoute());
  router.patch('/username/:id', makeUpdateUserUsernameRoute());

  app.use('/users', router);
};
