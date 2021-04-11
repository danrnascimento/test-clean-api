export interface INotebook {
  readonly id: string;
  name: string;
  user_id: string;
  notes_ids: string[];
  created_at: Date;
}
