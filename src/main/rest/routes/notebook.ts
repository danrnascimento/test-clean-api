import { Router, Express } from 'express';
import { expressRouterAdapter } from '@/infra/adapters/express_adapter';
import {
  makeCreateNotebookRoute,
  makeDeleteNotebookRoute,
  makeGetNotebookRoute,
  makeUpdateNotebookRoute,
} from '@/main/factories/notebookRoutes';

export const notebookRoutes = (app: Express) => {
  const router = Router();

  router.post('/', makeCreateNotebookRoute());
  router.get('/:id', makeGetNotebookRoute());
  router.patch('/:id', makeUpdateNotebookRoute());
  router.delete('/:id', makeDeleteNotebookRoute());

  app.use('/notebooks', router);
};
