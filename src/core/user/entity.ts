export interface IUser {
  readonly id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  pallets_ids: string[];
  created_at: Date;
}
