import { User } from '../../entities';

export interface UpdateUserUsername {
  updateUsername: (
    params: UpdateUserUsername.Params,
  ) => Promise<UpdateUserUsername.Result>;
}

export namespace UpdateUserUsername {
  export type Params = Pick<User, 'username' | 'id'>;
  export type Result = User | null;
}
