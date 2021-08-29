import { CreateNote } from '@/core/use_cases/note';

export interface CreateNoteRepository {
  create: (
    params: CreateNoteRepository.Params,
  ) => Promise<CreateNoteRepository.Result>;
}

export namespace CreateNoteRepository {
  export type Params = CreateNote.Params;
  export type Result = CreateNote.Result;
}
