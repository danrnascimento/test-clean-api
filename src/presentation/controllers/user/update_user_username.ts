import { User } from '@/core/entities';
import { UpdateUserUsernameProvider } from '@/data/providers';
import { clearObject } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class UpdateUserUsernameController implements Controller {
  constructor(private readonly provider: UpdateUserUsernameProvider) {}

  async handle(
    request: UpdateUserUsernameController.Request,
  ): Promise<UpdateUserUsernameController.Result> {
    try {
      const { id, username } = request;

      if (!id || !username) {
        return {
          status: 500,
          data: null,
          error: new Error('id and username are required'),
        };
      }

      const user = await this.provider.updateUsername({ id, username });
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

export namespace UpdateUserUsernameController {
  type UserHttpResponse = Omit<User, 'password'>;

  export type Request = { id: string; username: string };
  export type Result = HttpResponse<UserHttpResponse>;
}
