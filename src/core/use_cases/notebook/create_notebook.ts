import { Notebook } from '../../entities';

export interface CreateNotebook {
  create: (params: CreateNotebook.Params) => Promise<CreateNotebook.Result>;
}

export namespace CreateNotebook {
  export type Params = Pick<Notebook, 'name' | 'user_id'>;
  export type Result = Notebook | null;
}
