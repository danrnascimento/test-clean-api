import { UpdateUserUsername } from '@/core/use_cases';

export interface UpdateUserUsernameRepository {
  updateUsername: (
    data: UpdateUserUsernameRepository.Params,
  ) => Promise<UpdateUserUsernameRepository.Result>;
}

export namespace UpdateUserUsernameRepository {
  export type Params = UpdateUserUsername.Params;
  export type Result = UpdateUserUsername.Result;
}
