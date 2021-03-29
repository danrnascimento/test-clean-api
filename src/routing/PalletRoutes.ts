import express from 'express';
import { PalletController } from '../controllers/Pallets';

const router = express.Router();
const controller = new PalletController();

router.post('/', controller.createPallet);
router.get('/:palletId', controller.getPalletById);
router.patch('/:palletId', controller.updatePallet);
router.delete('/:palletId', controller.removePallet);

export default router;
