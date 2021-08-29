import { User } from '../../entities';

export interface GetUserById {
  get: (params: GetUserById.Params) => Promise<GetUserById.Result>;
}

export namespace GetUserById {
  export type Params = string;
  export type Result = User | null;
}
