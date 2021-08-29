import { Note } from '../../entities';

export interface UpdateNoteNotebook {
  updateNotebook: (
    params: UpdateNoteNotebook.Params,
  ) => Promise<UpdateNoteNotebook.Result>;
}

export namespace UpdateNoteNotebook {
  export type Params = Pick<Note, 'notebook_id' | 'id'>;
  export type Result = Note | null;
}
