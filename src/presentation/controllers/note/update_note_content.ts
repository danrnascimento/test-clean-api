import { Note } from '@/core/entities';
import { UpdateNoteContentProvider } from '@/data/providers';
import { Controller, HttpResponse } from '../../protocols';

export class UpdateNoteContentController implements Controller {
  constructor(private readonly provider: UpdateNoteContentProvider) {}

  async handle(
    request: UpdateNoteContentController.Request,
  ): Promise<UpdateNoteContentController.Result> {
    try {
      const { id, content } = request;
      const note = await this.provider.updateContent({ id, content });

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

export namespace UpdateNoteContentController {
  export type Request = { id: string; content: string };
  export type Result = HttpResponse<Note>;
}
