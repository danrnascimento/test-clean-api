import { Note } from '@/core/entities';
import { CreateNote } from '@/core/use_cases';
import { CreateNoteProvider } from '@/data/providers';

import { Controller, HttpResponse } from '../../protocols';

export class CreateNoteController implements Controller {
  constructor(private readonly provider: CreateNoteProvider) {}

  async handle(
    request: CreateNoteController.Request,
  ): Promise<CreateNoteController.Result> {
    try {
      const { content, notebook_id } = request;
      const note = await this.provider.create({ notebook_id, content });

      return {
        status: 201,
        data: note,
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        data: null,
        error: new Error('error to create'),
      };
    }
  }
}

export namespace CreateNoteController {
  export type Request = CreateNote.Params;
  export type Result = HttpResponse<Note>;
}
