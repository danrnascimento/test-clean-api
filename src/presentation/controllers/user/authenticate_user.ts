import { AuthenticateUser } from '@/core/use_cases';
import { AuthenticateUserProvider } from '@/data/providers';
import { Controller, HttpResponse } from '../../protocols';

export class AuthenticateUserController implements Controller {
  constructor(private readonly provider: AuthenticateUserProvider) {}

  async handle(
    request: AuthenticateUserController.Request,
  ): Promise<AuthenticateUserController.Result> {
    try {
      const { username, password } = request;
      if (!username || !password) {
        return {
          status: 500,
          data: null,
          error: new Error('username and password are required'),
        };
      }

      const authenticated = await this.provider.authenticate({
        username,
        password,
      });

      return {
        status: 200,
        data: { token: `${authenticated}` },
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

export namespace AuthenticateUserController {
  export type Request = AuthenticateUser.Params;
  export type Result = HttpResponse<{ token: string }>;
}
