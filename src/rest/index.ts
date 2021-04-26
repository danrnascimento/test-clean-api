import 'reflect-metadata';
import express from 'express';
import NoteRoutes from './routes/note';
import NotebookRoutes from './routes/notebook';
import { createConnection } from 'typeorm';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createConnection().then(() => {
  app.use('/note', NoteRoutes);
  app.use('/notebook', NotebookRoutes);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
