import { UpdateNotebook } from '@/core/use_cases/notebook';

export interface UpdateNotebookRepository {
  update: (
    params: UpdateNotebookRepository.Params,
  ) => Promise<UpdateNotebookRepository.Result>;
}

export namespace UpdateNotebookRepository {
  export type Params = UpdateNotebook.Params;
  export type Result = UpdateNotebook.Result;
}
