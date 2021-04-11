import { Request, Response } from 'express';
import { INoteController } from '../../core/Note/controller';
import noteRepository from '../../repositories/Notes';

export class NoteController implements INoteController {
  public async createNote(req: Request, res: Response) {
    const { name, value, notebook_id } = req.body;

    if (!name || !value || !notebook_id) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = noteRepository();

    try {
      const note = await repository.createNote(name, value, notebook_id);
      return res.status(200).json({ data: note });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async getNoteById(req: Request, res: Response) {
    const { noteId } = req.params;

    if (!noteId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = noteRepository();
    const note = await repository.getNoteById(noteId);

    if (!note) {
      return res.status(400).json({ error: 'note not found' });
    }

    return res.status(200).json({ data: note });
  }

  public async removeNote(req: Request, res: Response) {
    const { noteId } = req.params;

    if (!noteId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = noteRepository();

    try {
      const success = await repository.deleteNote(noteId);
      if (!success) {
        return res.status(500).json({ error: 'error' });
      }

      return res.status(200).json({ data: 'success' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async updateNote(req: Request, res: Response) {
    const { noteId } = req.params;
    const { name, value } = req.body;

    if (!noteId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = noteRepository();

    try {
      const note = await repository.updateNote(noteId, { name, value });
      return res.status(200).json({ data: note });
    } catch (error) {
      return res.status(200).json({ error });
    }
  }
}
