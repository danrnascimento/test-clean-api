import { User } from '@/core/entities';
import { CreateUser } from '@/core/use_cases';
import { CreateUserProvider } from '@/data/providers';
import { clearObject } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class CreateUserController implements Controller {
  constructor(private readonly repository: CreateUserProvider) {}

  async handle(
    request: CreateUserController.Request,
  ): Promise<CreateUserController.Result> {
    try {
      const { username, password } = request;
      if (!username || !password) {
        return {
          status: 500,
          data: null,
          error: new Error('username and password are required'),
        };
      }

      const user = await this.repository.create({ username, password });
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

export namespace CreateUserController {
  type UserHttpResponse = Omit<User, 'password'>;

  export type Request = CreateUser.Params;
  export type Result = HttpResponse<UserHttpResponse>;
}
