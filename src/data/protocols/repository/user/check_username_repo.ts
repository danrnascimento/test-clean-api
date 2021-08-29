import { CheckUsername } from '@/core/use_cases';

export interface CheckUsernameRepository {
  checkUsername: (
    data: CheckUsernameRepository.Params,
  ) => Promise<CheckUsernameRepository.Result>;
}

export namespace CheckUsernameRepository {
  export type Params = CheckUsername.Params;
  export type Result = CheckUsername.Result;
}
