import { User } from '@/core/entities';
import { GetUserByIdProvider } from '@/data/providers';
import { clearObject } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class GetUserByIdController implements Controller {
  constructor(private readonly provider: GetUserByIdProvider) {}

  async handle(
    request: GetUserByIdController.Request,
  ): Promise<GetUserByIdController.Result> {
    try {
      const { id } = request;
      if (!id) {
        return {
          status: 500,
          data: null,
          error: new Error('id is required'),
        };
      }

      const user = await this.provider.get(id);
      const data = clearObject(user, ['password']);

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

export namespace GetUserByIdController {
  type UserHttpResponse = Omit<User, 'password'>;

  export type Request = { id: string };
  export type Result = HttpResponse<UserHttpResponse>;
}
