import { Notebook } from '@/core/entities';
import { GetNotebookByIdProvider } from '@/data/providers';
import { clearObject } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class GetNotebookByIdController implements Controller {
  constructor(private readonly provider: GetNotebookByIdProvider) {}

  async handle(
    request: GetNotebookByIdController.Request,
  ): Promise<GetNotebookByIdController.Result> {
    try {
      const { id } = request;

      const notebook = await this.provider.get(id);
      const data = clearObject(notebook, ['user_id']);

      return {
        status: 200,
        data,
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

export namespace GetNotebookByIdController {
  type HttpResponseNotebook = Omit<Notebook, 'user_id'>;

  export type Request = { id: string };
  export type Result = HttpResponse<HttpResponseNotebook>;
}
