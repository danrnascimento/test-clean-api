import { Note } from '@/core/entities';
import { GetNoteByIdProvider } from '@/data/providers';
import { Controller, HttpResponse } from '../../protocols';

export class GetNoteByIdController implements Controller {
  constructor(private readonly provider: GetNoteByIdProvider) {}

  async handle(
    request: GetNoteByIdController.Request,
  ): Promise<GetNoteByIdController.Result> {
    try {
      const { id } = request;
      const note = await this.provider.get(id);

      return {
        status: 200,
        data: note,
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

export namespace GetNoteByIdController {
  export type Request = { id: string };
  export type Result = HttpResponse<Note>;
}
