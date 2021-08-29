import { Note } from '../../entities';

export interface GetNoteById {
  get: (params: GetNoteById.Params) => Promise<GetNoteById.Result>;
}

export namespace GetNoteById {
  export type Params = string;
  export type Result = Note | null;
}
