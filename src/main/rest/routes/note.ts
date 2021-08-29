import { Router, Express } from 'express';
import { NoteRepository } from '@/infra/database';
import {
  CreateNoteController,
  DeleteNoteController,
  GetNoteByIdController,
  UpdateNoteContentController,
  UpdateNoteNotebookController,
} from '@/presentation/controllers/note';
import { Controller } from '@/presentation/protocols';
import { expressRouterAdapter } from '@/infra/adapters/express_adapter';
import {
  CreateNoteProvider,
  DeleteNoteProvider,
  GetNoteByIdProvider,
  UpdateNoteContentProvider,
  UpdateNoteNotebookProvider,
} from '@/data/providers';

const createRoute = (): Controller => {
  const repository = new NoteRepository();
  const provider = new CreateNoteProvider(repository);
  const controller = new CreateNoteController(provider);

  return controller;
};

const getRoute = (): Controller => {
  const repository = new NoteRepository();
  const provider = new GetNoteByIdProvider(repository);
  const controller = new GetNoteByIdController(provider);

  return controller;
};

const updateNoteContentRoute = (): Controller => {
  const repository = new NoteRepository();
  const provider = new UpdateNoteContentProvider(repository, repository);
  const controller = new UpdateNoteContentController(provider);

  return controller;
};

const updateNoteNotebookRoute = (): Controller => {
  const repository = new NoteRepository();
  const provider = new UpdateNoteNotebookProvider(repository, repository);
  const controller = new UpdateNoteNotebookController(provider);

  return controller;
};

const deleteNoteRoute = (): Controller => {
  const repository = new NoteRepository();
  const provider = new DeleteNoteProvider(repository, repository);
  const controller = new DeleteNoteController(provider);

  return controller;
};

export const noteRoutes = (app: Express) => {
  const router = Router();

  router.post('/', expressRouterAdapter(createRoute()));
  router.get('/:id', expressRouterAdapter(getRoute()));
  router.patch('/content/:id', expressRouterAdapter(updateNoteContentRoute()));
  router.patch(
    '/notebook/:id',
    expressRouterAdapter(updateNoteNotebookRoute()),
  );
  router.delete('/:id', expressRouterAdapter(deleteNoteRoute()));

  app.use('/notes', router);
};
