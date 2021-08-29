import { UpdateNoteNotebook } from '@/core/use_cases/note';

export interface UpdateNoteNotebookRepository {
  updateNotebook: (
    params: UpdateNoteNotebookRepository.Params,
  ) => Promise<UpdateNoteNotebookRepository.Result>;
}

export namespace UpdateNoteNotebookRepository {
  export type Params = UpdateNoteNotebook.Params;
  export type Result = UpdateNoteNotebook.Result;
}
