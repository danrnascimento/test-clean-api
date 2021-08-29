import { GetNotebookById } from '@/core/use_cases/notebook';

export interface GetNotebookByIdRepository {
  get: (
    notebook_id: GetNotebookByIdRepository.Params,
  ) => Promise<GetNotebookByIdRepository.Result>;
}

export namespace GetNotebookByIdRepository {
  export type Params = GetNotebookById.Params;
  export type Result = GetNotebookById.Result;
}
