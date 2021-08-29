import { User } from '../../entities';

export interface AuthenticateUser {
  authenticate: (
    params: AuthenticateUser.Params,
  ) => Promise<AuthenticateUser.Result>;
}

export namespace AuthenticateUser {
  export type Params = Pick<User, 'username' | 'password'>;
  export type Result = boolean;
}
