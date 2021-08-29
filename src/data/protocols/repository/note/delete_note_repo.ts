import { DeleteNote } from '@/core/use_cases/note';

export interface DeleteNoteRepository {
  delete: (
    params: DeleteNoteRepository.Params,
  ) => Promise<DeleteNoteRepository.Result>;
}

export namespace DeleteNoteRepository {
  export type Params = DeleteNote.Params;
  export type Result = DeleteNote.Result;
}
