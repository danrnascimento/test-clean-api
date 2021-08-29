import { User } from '../../entities';

export interface UpdateUserPassword {
  updatePassword: (
    params: UpdateUserPassword.Params,
  ) => Promise<UpdateUserPassword.Result>;
}

export namespace UpdateUserPassword {
  export type Params = Pick<User, 'password' | 'id'>;
  export type Result = User | null;
}
