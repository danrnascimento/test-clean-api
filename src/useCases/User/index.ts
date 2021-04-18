import { CreateUserInput, User } from '../../entities/User';
import { IUserRepository } from '../../repositories/User';

export interface IUserCases {
  getUser: (id: string) => Promise<User>;
  createUser: (input: CreateUserInput) => Promise<User>;
  authenticate: (email: string, password: string) => Promise<boolean>;
}

export class UserCases implements IUserCases {
  constructor(private repository: IUserRepository) {}

  public getUser = async (id: string) => {
    const user = await this.repository.getUserById(id);
    if (!user) {
      throw new Error('user not found');
    }

    return user;
  };

  public createUser = async (input: CreateUserInput) => {
    const { email } = input;

    const existedUser = await this.repository.getUserByEmail(email);

    if (existedUser) {
      throw new Error('user already exists');
    }

    try {
      const user = await this.repository.createUser(input);
      return user;
    } catch (error) {
      throw error;
    }
  };

  public authenticate = async (email: string, password: string) => {
    const authenticated = await this.repository.checkCredentials(
      email,
      password,
    );

    if (!authenticated) {
      throw new Error('wrong credentials');
    }

    return true;
  };
}
