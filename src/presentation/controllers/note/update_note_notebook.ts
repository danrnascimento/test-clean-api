import { Note } from '@/core/entities';
import { UpdateNoteNotebookProvider } from '@/data/providers';
import { Controller, HttpResponse } from '../../protocols';

export class UpdateNoteNotebookController implements Controller {
  constructor(
    private readonly updateNoteNotebook: UpdateNoteNotebookProvider,
  ) {}

  async handle(
    request: UpdateNoteNotebookController.Request,
  ): Promise<UpdateNoteNotebookController.Result> {
    try {
      const { id, notebook_id } = request;
      const note = await this.updateNoteNotebook.updateNotebook({
        id,
        notebook_id,
      });

      return {
        status: 200,
        data: note,
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        data: null,
        error: new Error('update note error'),
      };
    }
  }
}

export namespace UpdateNoteNotebookController {
  export type Request = { id: string; notebook_id: string };
  export type Result = HttpResponse<Note>;
}
