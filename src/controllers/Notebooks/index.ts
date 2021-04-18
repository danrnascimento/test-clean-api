import { Request, Response } from 'express';
import { INotebookController } from '../../core/Notebook/controller';
import notebookRepository from '../../repositories/Notebooks';
import UserRepository from '../../repositories/User/implementation/TypeORM';

export class NotebookController implements INotebookController {
  public async createNotebook(req: Request, res: Response) {
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = notebookRepository();

    try {
      const notebook = await repository.createNotebook(name, user_id);
      return res.status(200).json({ data: notebook });
    } catch (error) {
      return res.status(200).json({ error });
    }
  }

  public async getNotebookById(req: Request, res: Response) {
    const { notebookId } = req.params;

    if (!notebookId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = notebookRepository();
    const notebook = await repository.getNotebookById(notebookId);

    if (!notebook) {
      return res.status(400).json({ error: 'notebook not found' });
    }

    return res.status(200).json({ data: notebook });
  }

  public async removeNotebook(req: Request, res: Response) {
    const { notebookId } = req.params;

    if (!notebookId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = notebookRepository();
    const success = await repository.deleteNotebook(notebookId);

    if (!success) {
      return res.status(500).json({ error: 'error' });
    }

    return res.status(200).json({ data: 'success' });
  }

  public async updateNotebook(req: Request, res: Response) {
    const { notebookId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'missing property' });
    }

    const repository = notebookRepository();
    const notebook = await repository.updateNotebook(notebookId, name);

    if (!notebook) {
      return res.status(500).json({ error: 'error' });
    }

    return res.status(200).json({ data: notebook });
  }
}
