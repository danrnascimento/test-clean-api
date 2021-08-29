import { Notebook } from '@/core/entities';
import { CreateNotebook } from '@/core/use_cases';
import { CreateNotebookProvider } from '@/data/providers';
import { clearObject } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class CreateNotebookController implements Controller {
  constructor(private readonly provider: CreateNotebookProvider) {}

  async handle(
    request: CreateNotebookController.Request,
  ): Promise<CreateNotebookController.Result> {
    try {
      const { name, user_id } = request;
      if (!name || !user_id) {
        return {
          status: 500,
          data: null,
          error: new Error('name and user_id are required'),
        };
      }

      const notebook = await this.provider.create({ name, user_id });
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

export namespace CreateNotebookController {
  type HttpResponseNotebook = Omit<Notebook, 'user_id'>;

  export type Request = CreateNotebook.Params;
  export type Result = HttpResponse<HttpResponseNotebook>;
}
