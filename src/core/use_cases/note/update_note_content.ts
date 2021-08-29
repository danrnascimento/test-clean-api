import { Note } from '../../entities';

export interface UpdateNoteContent {
  updateContent: (
    params: UpdateNoteContent.Params,
  ) => Promise<UpdateNoteContent.Result>;
}

export namespace UpdateNoteContent {
  export type Params = Pick<Note, 'content' | 'id'>;
  export type Result = Note | null;
}
