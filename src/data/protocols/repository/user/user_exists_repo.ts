import { UserExists } from '@/core/use_cases';

export interface UserExistsRepository {
  exists: (
    data: UserExistsRepository.Params,
  ) => Promise<UserExistsRepository.Result>;
}

export namespace UserExistsRepository {
  export type Params = UserExists.Params;
  export type Result = UserExists.Result;
}
