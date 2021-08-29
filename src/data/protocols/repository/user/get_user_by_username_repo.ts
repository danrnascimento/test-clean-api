import { GetUserByUsername } from '@/core/use_cases';

export interface GetUserByUsernameRepository {
  getByUsername: (
    data: GetUserByUsernameRepository.Params,
  ) => Promise<GetUserByUsernameRepository.Result>;
}

export namespace GetUserByUsernameRepository {
  export type Params = GetUserByUsername.Params;
  export type Result = GetUserByUsername.Result;
}
