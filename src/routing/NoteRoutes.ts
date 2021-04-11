import express from 'express';
import { NoteController } from '../controllers/Notes';

const router = express.Router();
const controller = new NoteController();

router.post('/', controller.createNote);
router.get('/:noteId', controller.getNoteById);
router.patch('/:noteId', controller.updateNote);
router.delete('/:noteId', controller.removeNote);

export default router;
