import { Notebook } from '@/core/entities';
import { UpdateNotebookProvider } from '@/data/providers';
import { clearObject } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class UpdateNotebookController implements Controller {
  constructor(private readonly provider: UpdateNotebookProvider) {}

  async handle(
    request: UpdateNotebookController.Request,
  ): Promise<UpdateNotebookController.Result> {
    try {
      const { id, name } = request;

      const notebook = await this.provider.update({ id, name });
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

export namespace UpdateNotebookController {
  type HttpResponseNotebook = Omit<Notebook, 'user_id'>;

  export type Request = { id: string; name: string };
  export type Result = HttpResponse<HttpResponseNotebook>;
}
