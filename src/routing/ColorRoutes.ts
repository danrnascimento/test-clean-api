import express from 'express';
import { ColorController } from '../controllers/Colors';

const router = express.Router();
const controller = new ColorController();

router.post('/', controller.createColor);
router.get('/:colorId', controller.getColorById);
router.patch('/:colorId', controller.updateColor);
router.delete('/:colorId', controller.removeColor);

export default router;
