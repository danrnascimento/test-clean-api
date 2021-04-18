import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

export type CreateUserInput = Pick<User, 'email' | 'password' | 'name'>;

export class User {
  readonly id: string;
  name: string;
  email: string;
  _password: string;
  notebooks_ids: string[] = [];
  created_at: Date = new Date();

  get password() {
    return this._password;
  }

  set password(value: string) {
    this._password = bcrypt.hashSync(value, 8);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  public checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
