import { v4 } from 'uuid';
import { User, UserRepresentation } from './entity';

type UserInput = Pick<User, 'name' | 'lastName' | 'email' | 'password'>;

export class UserService {
  public static createUser({
    name,
    lastName,
    email,
    password,
  }: UserInput): User {
    const id = v4();
    return {
      id,
      name,
      lastName,
      email,
      password,
      palletsIds: [],
    };
  }

  public static getRepresentation(user: User): UserRepresentation {
    const representation = user;
    delete representation.password;
    delete representation.palletsIds;

    return { ...representation, pallets: [] };
  }
}
