import { v4 as uuid } from 'uuid';

export type CreateNoteInput = Pick<Note, 'content'>;

export interface INote {
  readonly id: string;
  content: string;
  created_at: Date;
}

export default class Note implements INote {
  id: string;
  content: string;
  created_at: Date = new Date();

  constructor(input: CreateNoteInput, id?: string) {
    this.content = input.content;
    this.created_at = new Date();

    if (!id) {
      this.id = uuid();
    }
  }
}
