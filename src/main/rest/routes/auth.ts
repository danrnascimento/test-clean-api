import { Express, Router } from 'express';
import { expressRouterAdapter } from '@/infra/adapters';
import { makeAuthenticateRoute } from '@/main/factories/authRoutes';

export const authRoutes = (app: Express) => {
  const router = Router();
  router.post('/', expressRouterAdapter(makeAuthenticateRoute()));
  app.use('/auth', router);
};
