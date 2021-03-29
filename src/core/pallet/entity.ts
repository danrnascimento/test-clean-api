export interface IPallet {
  readonly id: string;
  name: string;
  user_id: string;
  colors_ids: string[];
  created_at: Date;
}
