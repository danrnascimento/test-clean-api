export interface INote {
  readonly id: string;
  name: string;
  value: string;
  notebook_id: string;
  created_at: Date;
}
