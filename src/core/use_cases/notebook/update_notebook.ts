import { Notebook } from '../../entities';

export interface UpdateNotebook {
  update: (params: UpdateNotebook.Params) => Promise<UpdateNotebook.Result>;
}

export namespace UpdateNotebook {
  export type Params = Pick<Notebook, 'name' | 'id'>;
  export type Result = Notebook | null;
}
