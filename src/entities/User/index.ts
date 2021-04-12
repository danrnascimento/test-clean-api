import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

export type CreateUserInput = Pick<User, 'email' | 'password' | 'name'>;

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  private _password: string;
  public notebooks_ids: string[] = [];
  public created_at: Date = new Date();

  public get password() {
    return this._password;
  }

  public set password(value: string) {
    this._password = bcrypt.hashSync(value, 8);
  }

  constructor(input: CreateUserInput, id?: string) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;

    if (!id) {
      this.id = uuid();
    }
  }

  public checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
