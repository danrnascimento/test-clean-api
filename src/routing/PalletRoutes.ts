import express from 'express';
import { PalletController } from '../controllers/Pallets';

const router = express.Router();
const controller = new PalletController();

router.get('/:palletId', controller.getPalletById);
router.patch('/:palletId', controller.updatePallet);
router.post('/', controller.createPallet);

export default router;
