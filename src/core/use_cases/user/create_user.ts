import { User } from '../../entities';

export interface CreateUser {
  create: (params: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = Pick<User, 'username' | 'password'>;
  export type Result = User | null;
}
