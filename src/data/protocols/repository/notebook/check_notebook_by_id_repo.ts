import { CheckNotebookById } from '@/core/use_cases/notebook';

export interface CheckNotebookByIdRepository {
  check: (
    notebook_id: CheckNotebookByIdRepository.Params,
  ) => Promise<CheckNotebookByIdRepository.Result>;
}

export namespace CheckNotebookByIdRepository {
  export type Params = CheckNotebookById.Params;
  export type Result = CheckNotebookById.Result;
}
