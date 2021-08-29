import { UpdateUserPassword } from '@/core/use_cases';

export interface UpdateUserPasswordRepository {
  updatePassword: (
    data: UpdateUserPasswordRepository.Params,
  ) => Promise<UpdateUserPasswordRepository.Result>;
}

export namespace UpdateUserPasswordRepository {
  export type Params = UpdateUserPassword.Params;
  export type Result = UpdateUserPassword.Result;
}
