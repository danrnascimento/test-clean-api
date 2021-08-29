import { CheckNoteById } from '@/core/use_cases/note';

export interface CheckNoteByIdRepository {
  check: (
    params: CheckNoteByIdRepository.Params,
  ) => Promise<CheckNoteByIdRepository.Result>;
}

export namespace CheckNoteByIdRepository {
  export type Params = CheckNoteById.Params;
  export type Result = CheckNoteById.Result;
}
