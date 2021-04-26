import express from 'express';
import { NotebookCases } from '../../core/use_Cases/Notebook';
import { NotebookRepository } from '../../database/repositories/notebook';
import { NotebookController } from '../controllers/notebook';

const router = express.Router();

const repository = new NotebookRepository();
const useCases = new NotebookCases(repository);
const controller = new NotebookController(useCases);

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
