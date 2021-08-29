import { User } from '@/core/entities';
import { UpdateUserPasswordProvider } from '@/data/providers';
import { clearObject } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class UpdateUserPasswordController implements Controller {
  constructor(private readonly provider: UpdateUserPasswordProvider) {}

  async handle(
    request: UpdateUserPasswordController.Request,
  ): Promise<HttpResponse> {
    try {
      const { id, password } = request;
      if (!id || !password) {
        return {
          status: 500,
          data: null,
          error: new Error('id and password are required'),
        };
      }

      const user = await this.provider.updatePassword({
        id,
        password,
      });

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

export namespace UpdateUserPasswordController {
  type UserHttpResponse = Omit<User, 'password'>;

  export type Request = { id: string; password: string };
  export type Result = HttpResponse<UserHttpResponse>;
}
