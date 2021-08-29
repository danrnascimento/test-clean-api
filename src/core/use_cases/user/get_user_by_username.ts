import { User } from '../../entities';

export interface GetUserByUsername {
  getByUsername: (
    params: GetUserByUsername.Params,
  ) => Promise<GetUserByUsername.Result>;
}

export namespace GetUserByUsername {
  export type Params = string;
  export type Result = User | null;
}
