import express from 'express';
import authRoutes from './routes/auth';
import bodyParser from 'body-parser';
import { UserRoutes } from '../modules/user';
import { PalletRouter } from '../modules/pallet';

const app = express();
const port = 3000;

app.get('/', (request: any, response: any) => {
  response.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/user', UserRoutes);
app.use('/pallet', PalletRouter);

export const init = () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
