import { Note } from './note';

export type Notebook = {
  readonly id: string;
  name: string;
  notes: Note[];
  created_at: Date;
  readonly user_id: string;
};
