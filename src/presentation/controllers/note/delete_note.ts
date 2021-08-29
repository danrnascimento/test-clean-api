import { DeleteNoteProvider } from '@/data/providers';
import { Controller, HttpResponse } from '../../protocols';

export class DeleteNoteController implements Controller {
  constructor(private readonly provider: DeleteNoteProvider) {}

  async handle(
    request: DeleteNoteController.Request,
  ): Promise<DeleteNoteController.Result> {
    try {
      const { id } = request;
      const deleted = await this.provider.delete(id);

      return {
        status: 200,
        data: { deleted },
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

export namespace DeleteNoteController {
  export type Request = { id: string };
  export type Result = HttpResponse<{ deleted: boolean }>;
}
