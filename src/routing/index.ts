import 'reflect-metadata';
import express from 'express';
import UserRoutes from './UserRoutes';
import PalletRoutes from './PalletRoutes';
import ColorRoutes from './ColorRoutes';

import '../database';

const app = express();
const port = 3000;

app.get('/', (request: any, response: any) => {
  response.send('Hello World!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', UserRoutes);
app.use('/pallet', PalletRoutes);
app.use('/pallet/:palletId/color', ColorRoutes);

export const init = () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
