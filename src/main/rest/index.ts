import { PostgressConnection } from '@/infra/database';
import Express from 'express';
import { noteRoutes, notebookRoutes, userRoutes } from './routes';

const app = Express();

PostgressConnection.connect().then(async () => {
  app.use(Express.json());

  userRoutes(app);
  notebookRoutes(app);
  noteRoutes(app);

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});
