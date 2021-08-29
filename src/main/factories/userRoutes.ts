import {
  CreateUserProvider,
  GetUserByIdProvider,
  UpdateUserPasswordProvider,
  UpdateUserUsernameProvider,
} from '@/data/providers';
import { BcryptAdapter, expressRouterAdapter } from '@/infra/adapters';
import { UserRepository } from '@/infra/database';
import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserPasswordController,
  UpdateUserUsernameController,
} from '@/presentation/controllers/user';

export const makeCreateUserRoute = () => {
  const repository = new UserRepository();
  const crypto = new BcryptAdapter();
  const provider = new CreateUserProvider(repository, repository, crypto);
  const controller = new CreateUserController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeGetUserRoute = () => {
  const repository = new UserRepository();
  const provider = new GetUserByIdProvider(repository);
  const controller = new GetUserByIdController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeUpdateUserPasswordRoute = () => {
  const repository = new UserRepository();
  const crypto = new BcryptAdapter();
  const provider = new UpdateUserPasswordProvider(
    repository,
    repository,
    crypto,
  );
  const controller = new UpdateUserPasswordController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeUpdateUserUsernameRoute = () => {
  const repository = new UserRepository();
  const provider = new UpdateUserUsernameProvider(
    repository,
    repository,
    repository,
  );
  const controller = new UpdateUserUsernameController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};
