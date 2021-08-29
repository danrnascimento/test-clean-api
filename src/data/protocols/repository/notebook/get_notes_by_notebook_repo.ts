import { GetNotesByNotebook } from '@/core/use_cases/notebook';

export interface GetNotesByNotebookRepository {
  getNotes: (
    notebook_id: GetNotesByNotebookRepository.Params,
  ) => Promise<GetNotesByNotebookRepository.Result>;
}

export namespace GetNotesByNotebookRepository {
  export type Params = GetNotesByNotebook.Params;
  export type Result = GetNotesByNotebook.Result;
}
