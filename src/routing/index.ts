import 'reflect-metadata';
import express from 'express';
import UserRoutes from './UserRoutes';
import NotebookRoutes from './NotebookRoutes';
import NoteRoutes from './NoteRoutes';

import { createConnection } from '../database';

const app = express();
const port = 3000;

app.get('/', (request: any, response: any) => {
  response.send('Hello World!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createConnection().then(() => {
  app.use('/user', UserRoutes);
  app.use('/notebook', NotebookRoutes);
  app.use('/note', NoteRoutes);
});

export const init = () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
