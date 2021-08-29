import { Router, Express } from 'express';
import {
  makeCreateNoteRoute,
  makeDeleteNoteRoute,
  makeGetNoteRoute,
  makeUpdateNoteContentRoute,
  makeUpdateNoteNotebookRoute,
} from '@/main/factories/noteRoutes';

export const noteRoutes = (app: Express) => {
  const router = Router();

  router.post('/', makeCreateNoteRoute());
  router.get('/:id', makeGetNoteRoute());
  router.patch('/content/:id', makeUpdateNoteContentRoute());
  router.patch('/notebook/:id', makeUpdateNoteNotebookRoute());
  router.delete('/:id', makeDeleteNoteRoute());

  app.use('/notes', router);
};
