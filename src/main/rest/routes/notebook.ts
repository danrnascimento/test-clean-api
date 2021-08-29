import { Router, Express } from 'express';
import { NotebookRepository } from '@/infra/database';
import {
  CreateNotebookController,
  DeleteNotebookController,
  GetNotebookByIdController,
  UpdateNotebookController,
} from '@/presentation/controllers/notebook';
import { Controller } from '@/presentation/protocols';
import { expressRouterAdapter } from '@/infra/adapters/express_adapter';
import {
  CreateNotebookProvider,
  DeleteNotebookProvider,
  GetNotebookByIdProvider,
  UpdateNotebookProvider,
} from '@/data/providers';

const createRoute = (): Controller => {
  const repository = new NotebookRepository();
  const provider = new CreateNotebookProvider(repository);
  const controller = new CreateNotebookController(provider);

  return controller;
};

const getRoute = (): Controller => {
  const repository = new NotebookRepository();
  const provider = new GetNotebookByIdProvider(repository);
  const controller = new GetNotebookByIdController(provider);

  return controller;
};

const updateRoute = (): Controller => {
  const repository = new NotebookRepository();
  const provider = new UpdateNotebookProvider(repository, repository);
  const controller = new UpdateNotebookController(provider);

  return controller;
};

const deleteRoute = (): Controller => {
  const repository = new NotebookRepository();
  const provider = new DeleteNotebookProvider(repository, repository);
  const controller = new DeleteNotebookController(provider);

  return controller;
};

export const notebookRoutes = (app: Express) => {
  const router = Router();

  router.post('/', expressRouterAdapter(createRoute()));
  router.get('/:id', expressRouterAdapter(getRoute()));
  router.patch('/:id', expressRouterAdapter(updateRoute()));
  router.delete('/:id', expressRouterAdapter(deleteRoute()));

  app.use('/notebooks', router);
};
