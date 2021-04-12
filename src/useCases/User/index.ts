import { CreateUserInput } from '../../entities/User';
import { IUserRepository } from '../../repositories2/User';

export class UserCases {
  constructor(private repository: IUserRepository) {}

  async getUser(id: string) {
    const user = await this.repository.getUserById(id);
    if (!user) {
      return Promise.reject(new Error('user not found'));
    }

    return user;
  }

  async createUser(input: CreateUserInput) {
    const { email } = input;
    // const inputsAreValid = User.validateCreateInput(input);

    // if (inputsAreValid !== true) {
    //   return Promise.reject(inputsAreValid);
    // }

    const existedUser = await this.repository.getUserByEmail(email);

    if (existedUser) {
      return Promise.reject(new Error('user already exists'));
    }

    try {
      const user = await this.repository.createUser(input);
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async authenticate(email: string, password: string) {
    const authenticated = await this.repository.checkCredentials(
      email,
      password,
    );

    if (!authenticated) {
      return Promise.reject(new Error('wrong credentials'));
    }

    return 'authenticated';
  }
}
