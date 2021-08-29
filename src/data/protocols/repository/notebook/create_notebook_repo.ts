import { CreateNotebook } from '@/core/use_cases/notebook';

export interface CreateNotebookRepository {
  create: (
    data: CreateNotebookRepository.Params,
  ) => Promise<CreateNotebookRepository.Result>;
}

export namespace CreateNotebookRepository {
  export type Params = CreateNotebook.Params;
  export type Result = CreateNotebook.Result;
}
