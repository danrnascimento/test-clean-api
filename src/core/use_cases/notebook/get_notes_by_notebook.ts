import { Note } from '../../entities';

export interface GetNotesByNotebook {
  getNotes: (
    params: GetNotesByNotebook.Params,
  ) => Promise<GetNotesByNotebook.Result>;
}

export namespace GetNotesByNotebook {
  export type Params = string;
  export type Result = Note[] | null;
}
