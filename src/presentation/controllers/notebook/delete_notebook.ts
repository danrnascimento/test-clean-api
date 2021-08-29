import { DeleteNotebookProvider } from '@/data/providers';
import { Controller, HttpResponse } from '../../protocols';

export class DeleteNotebookController implements Controller {
  constructor(private readonly provider: DeleteNotebookProvider) {}

  async handle(
    request: DeleteNotebookController.Request,
  ): Promise<DeleteNotebookController.Result> {
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

export namespace DeleteNotebookController {
  export type Request = { id: string };
  export type Result = HttpResponse<{ deleted: boolean }>;
}
