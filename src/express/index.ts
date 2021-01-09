import express from 'express';
import usersRoutes from './routes/users';

const app = express();
const port = 3000;

app.get('/', (request: any, response: any) => {
  response.send('Hello World!');
});

app.use('/user', usersRoutes);

export const init = () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
