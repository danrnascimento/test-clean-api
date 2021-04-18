export interface IUser {
  readonly id: string;
  name: string;
  email: string;
  password: string;
  notebooks_ids: string[];
  created_at: Date;
}
