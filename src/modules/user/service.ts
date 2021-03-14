import { v4 } from 'uuid';
import { IUser } from './entity';

type UserInput = Pick<IUser, 'name' | 'lastName' | 'email'>;

export class UserService {
  public static createUser({ name, lastName, email }: UserInput): IUser {
    const id = v4();
    return {
      id,
      name,
      lastName,
      email,
      created_at: new Date(),
    };
  }

  public static getRepresentation(user: IUser): IUser {
    const representation = user;

    return { ...representation };
  }
}
