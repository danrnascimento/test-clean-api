import { Note } from '../../entities';

export interface CreateNote {
  create: (params: CreateNote.Params) => Promise<CreateNote.Result>;
}

export namespace CreateNote {
  export type Params = Pick<Note, 'content' | 'notebook_id'>;
  export type Result = Note | null;
}
