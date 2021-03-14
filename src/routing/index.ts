import 'reflect-metadata';
import express from 'express';
import { UserRoutes } from '../modules/user';
import { PalletRouter } from '../modules/pallet';
import { ColorRouter } from '../modules/color';

import '../database';

const app = express();
const port = 3000;

app.get('/', (request: any, response: any) => {
  response.send('Hello World!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', UserRoutes);
app.use('/pallet', PalletRouter);
app.use('/pallet/:palletId/color', ColorRouter);

export const init = () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
