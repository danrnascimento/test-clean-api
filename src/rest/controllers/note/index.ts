import { Request, Response } from 'express';
import { INoteCases } from '../../../core/use_Cases/Note';

export class NoteController {
  constructor(private useCases: INoteCases) {}

  public getById = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const note = await this.useCases.getNote(id);
      return response.status(200).json({ data: note });
    } catch (error) {
      response.status(500).json({ error });
    }
  };

  public create = async (request: Request, response: Response) => {
    const { content } = request.body;

    try {
      const note = await this.useCases.createNote({ content });
      return response.status(200).json({ data: note });
    } catch (error) {
      response.status(500).json({ error });
    }
  };

  public update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { content } = request.body;

    try {
      const note = await this.useCases.updateNote(id, { content });
      return response.status(200).json({ data: note });
    } catch (error) {
      response.status(500).json({ error });
    }
  };

  public delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const success = await this.useCases.deleteNote(id);
      return response.status(200).json({ data: success });
    } catch (error) {
      response.status(500).json({ error });
    }
  };
}
