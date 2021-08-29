import { Notebook } from '../../entities';

export interface GetNotebookById {
  get: (params: GetNotebookById.Params) => Promise<GetNotebookById.Result>;
}

export namespace GetNotebookById {
  export type Params = string;
  export type Result = Notebook | null;
}
