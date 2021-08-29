import {
  CreateNoteProvider,
  DeleteNoteProvider,
  GetNoteByIdProvider,
  UpdateNoteContentProvider,
  UpdateNoteNotebookProvider,
} from '@/data/providers';
import { expressRouterAdapter } from '@/infra/adapters';
import { NoteRepository } from '@/infra/database';
import {
  CreateNoteController,
  DeleteNoteController,
  GetNoteByIdController,
  UpdateNoteContentController,
  UpdateNoteNotebookController,
} from '@/presentation/controllers/note';

export const makeCreateNoteRoute = () => {
  const repository = new NoteRepository();
  const provider = new CreateNoteProvider(repository);
  const controller = new CreateNoteController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeGetNoteRoute = () => {
  const repository = new NoteRepository();
  const provider = new GetNoteByIdProvider(repository);
  const controller = new GetNoteByIdController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeUpdateNoteContentRoute = () => {
  const repository = new NoteRepository();
  const provider = new UpdateNoteContentProvider(repository, repository);
  const controller = new UpdateNoteContentController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeUpdateNoteNotebookRoute = () => {
  const repository = new NoteRepository();
  const provider = new UpdateNoteNotebookProvider(repository, repository);
  const controller = new UpdateNoteNotebookController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};

export const makeDeleteNoteRoute = () => {
  const repository = new NoteRepository();
  const provider = new DeleteNoteProvider(repository, repository);
  const controller = new DeleteNoteController(provider);
  const route = expressRouterAdapter(controller);

  return route;
};
