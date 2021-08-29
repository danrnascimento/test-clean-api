import { DeleteNotebook } from '@/core/use_cases/notebook';

export interface DeleteNotebookRepository {
  delete: (notebook_id: string) => Promise<DeleteNotebookRepository.Result>;
}

export namespace DeleteNotebookRepository {
  export type Params = DeleteNotebook.Params;
  export type Result = DeleteNotebook.Result;
}
