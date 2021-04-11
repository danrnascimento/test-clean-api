import express from 'express';
import { NotebookController } from '../controllers/Notebooks';

const router = express.Router();
const controller = new NotebookController();

router.post('/', controller.createNotebook);
router.get('/:notebookId', controller.getNotebookById);
router.patch('/:notebookId', controller.updateNotebook);
router.delete('/:notebookId', controller.removeNotebook);

export default router;
