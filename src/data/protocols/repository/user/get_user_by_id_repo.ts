import { GetUserById } from '@/core/use_cases';

export interface GetUserByIdRepository {
  get: (
    data: GetUserByIdRepository.Params,
  ) => Promise<GetUserByIdRepository.Result>;
}

export namespace GetUserByIdRepository {
  export type Params = GetUserById.Params;
  export type Result = GetUserById.Result;
}
