import { Request, Response } from 'express';
import { INotebookCases } from '../../../core/use_Cases/Notebook';

export class NotebookController {
  constructor(private useCases: INotebookCases) {}

  public async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const notebook = await this.useCases.getNotebok(id);
      return response.status(200).json({ data: notebook });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  public async create(request: Request, response: Response) {
    const { name } = request.body;

    try {
      const notebook = await this.useCases.createNotebook({ name });
      return response.status(200).json({ data: notebook });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      const notebook = await this.useCases.updateNotebook(id, { name });
      return response.status(200).json({ data: notebook });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const success = await this.useCases.deleteNotebook(id);
      return response.status(200).json({ data: success });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
