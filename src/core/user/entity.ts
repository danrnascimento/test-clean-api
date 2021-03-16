export interface IUser {
  readonly id: string;
  name: string;
  lastName: string;
  email: string;
  palletsIds: string[];
  createdAt: Date;
}
