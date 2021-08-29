import { Router, Express } from 'express';
import { UserRepository } from '@/infra/database';
import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserPasswordController,
  UpdateUserUsernameController,
} from '@/presentation/controllers/user';
import { Controller } from '@/presentation/protocols';
import { expressRouterAdapter } from '@/infra/adapters/express_adapter';
import {
  CreateUserProvider,
  GetUserByIdProvider,
  UpdateUserPasswordProvider,
  UpdateUserUsernameProvider,
} from '@/data/providers';
import { BcryptAdapter } from '@/infra/adapters';

const createRoute = (): Controller => {
  const repository = new UserRepository();
  const crypto = new BcryptAdapter();
  const provider = new CreateUserProvider(repository, repository, crypto);
  const controller = new CreateUserController(provider);

  return controller;
};

const getRoute = (): Controller => {
  const repository = new UserRepository();
  const provider = new GetUserByIdProvider(repository);
  const controller = new GetUserByIdController(provider);

  return controller;
};

const updateUserPasswordRoute = (): Controller => {
  const repository = new UserRepository();
  const crypto = new BcryptAdapter();
  const provider = new UpdateUserPasswordProvider(
    repository,
    repository,
    crypto,
  );
  const controller = new UpdateUserPasswordController(provider);

  return controller;
};

const updateUserUsernameRoute = (): Controller => {
  const repository = new UserRepository();
  const provider = new UpdateUserUsernameProvider(
    repository,
    repository,
    repository,
  );
  const controller = new UpdateUserUsernameController(provider);

  return controller;
};

export const userRoutes = (app: Express) => {
  const router = Router();

  router.post('/', expressRouterAdapter(createRoute()));
  router.get('/:id', expressRouterAdapter(getRoute()));
  router.patch(
    '/password/:id',
    expressRouterAdapter(updateUserPasswordRoute()),
  );
  router.patch(
    '/username/:id',
    expressRouterAdapter(updateUserUsernameRoute()),
  );

  app.use('/users', router);
};
