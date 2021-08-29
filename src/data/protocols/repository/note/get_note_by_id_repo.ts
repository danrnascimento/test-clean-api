import { GetNoteById } from '@/core/use_cases/note';

export interface GetNoteByIdRepository {
  get: (
    params: GetNoteByIdRepository.Params,
  ) => Promise<GetNoteByIdRepository.Result>;
}

export namespace GetNoteByIdRepository {
  export type Params = GetNoteById.Params;
  export type Result = GetNoteById.Result;
}
