import express from 'express';
import { ColorController } from './controller';

const router = express.Router();
const controller = new ColorController();

router.get('/:colorId', controller.getColorById);
router.patch('/:colorId', controller.updateColor);
router.post('/', controller.createColor);

export { router };
