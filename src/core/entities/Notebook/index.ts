import { v4 as uuid } from 'uuid';

export type CreateNotebookInput = Pick<Notebook, 'name'>;

export interface INotebook {
  readonly id: string;
  name: string;
  notes_ids: string[];
  created_at: Date;
}

export default class Notebook {
  id: string;
  name: string;
  notes_ids: string[] = [];
  created_at: Date = new Date();

  constructor(input: CreateNotebookInput, id?: string) {
    this.name = input.name;

    if (!id) {
      this.id = uuid();
    }
  }
}
