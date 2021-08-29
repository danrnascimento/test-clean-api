import { Express, Router } from 'express';
import { AuthenticateUserProvider } from '@/data/providers';
import { BcryptAdapter, expressRouterAdapter } from '@/infra/adapters';
import { UserRepository } from '@/infra/database';
import { AuthenticateUserController } from '@/presentation/controllers/user';
import { Controller } from '@/presentation/protocols';

const authenticateRoute = (): Controller => {
  const repository = new UserRepository();
  const crypto = new BcryptAdapter();
  const provider = new AuthenticateUserProvider(repository, crypto);
  const controller = new AuthenticateUserController(provider);

  return controller;
};

export const authRoutes = (app: Express) => {
  const router = Router();
  router.post('/', expressRouterAdapter(authenticateRoute()));
  app.use('/auth', router);
};
