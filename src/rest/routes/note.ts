import express from 'express';
import { NoteCases } from '../../core/use_Cases/Note';
import { NoteRepository } from '../../database/repositories/note';
import { NoteController } from '../controllers/note';

const router = express.Router();

const repository = new NoteRepository();
const useCases = new NoteCases(repository);
const controller = new NoteController(useCases);

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
