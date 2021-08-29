import { Note } from '@/core/entities';
import { GetNotesByNotebookProvider } from '@/data/providers';
import { Controller, HttpResponse } from '../../protocols';

export class GetNotesByNotebookController implements Controller {
  constructor(
    private readonly GetNotesByNotebook: GetNotesByNotebookProvider,
  ) {}

  async handle(
    request: GetNotesByNotebookController.Request,
  ): Promise<GetNotesByNotebookController.Result> {
    try {
      const { id } = request;
      const notes = await this.GetNotesByNotebook.getNotes(id);

      return {
        status: 200,
        data: { notes },
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        data: null,
        error,
      };
    }
  }
}

export namespace GetNotesByNotebookController {
  export type Request = { id: string };
  export type Result = HttpResponse<{ notes: Note[] }>;
}
