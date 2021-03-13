import express from 'express';
import { PalletController } from './controller';

const router = express.Router();
const controller = new PalletController();

router.get('/:palletId', controller.getPalletById);

export { router };
