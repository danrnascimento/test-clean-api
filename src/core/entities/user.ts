import { Notebook } from './notebook';

export type User = {
  readonly id: string;
  username: string;
  password: string;
  created_at: Date;
  notebooks: Notebook[];
};
