import {
  CreateNotebookProvider,
  DeleteNotebookProvider,
  GetNotebookByIdProvider,
  UpdateNotebookProvider,
} from '@/data/providers';
import { expressRouterAdapter } from '@/infra/adapters';
import { NotebookRepository } from '@/infra/database';
import {
  CreateNotebookController,
  DeleteNotebookController,
  GetNotebookByIdController,
  UpdateNotebookController,
} from '@/presentation/controllers/notebook';

export const makeCreateNotebookRoute = () => {
  const repository = new NotebookRepository();
  const provider = new CreateNotebookProvider(repository);
  const controller = new CreateNotebookController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeGetNotebookRoute = () => {
  const repository = new NotebookRepository();
  const provider = new GetNotebookByIdProvider(repository);
  const controller = new GetNotebookByIdController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeUpdateNotebookRoute = () => {
  const repository = new NotebookRepository();
  const provider = new UpdateNotebookProvider(repository, repository);
  const controller = new UpdateNotebookController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeDeleteNotebookRoute = () => {
  const repository = new NotebookRepository();
  const provider = new DeleteNotebookProvider(repository, repository);
  const controller = new DeleteNotebookController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};
