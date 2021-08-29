import { AuthenticateUserProvider } from '@/data/providers';
import { BcryptAdapter, expressRouterAdapter } from '@/infra/adapters';
import { UserRepository } from '@/infra/database';
import { AuthenticateUserController } from '@/presentation/controllers/user';

export const makeAuthenticateRoute = () => {
  const repository = new UserRepository();
  const crypto = new BcryptAdapter();
  const provider = new AuthenticateUserProvider(repository, crypto);
  const controller = new AuthenticateUserController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};
