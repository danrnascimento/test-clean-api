import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import { IUserRepository } from '../..';
import { CreateUserInput, User } from '../../../../entities/User';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository {
  public getUserById = async (id: string) => {
    const user = await this.findOne({ id });

    if (!user) {
      return;
    }

    return user;
  };

  public getUserByEmail = async (email: string) => {
    const repo = getRepository<User>('users');

    const user = await repo.findOne({ email });

    if (!user) {
      return;
    }

    return user;
  };

  public createUser = async ({ email, password, name }: CreateUserInput) => {
    const repo = getRepository<User>('users');

    const user = await repo.create({ name, email, password });

    try {
      await repo.save(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  public checkCredentials = async (email: string, password: string) => {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('user not found');
    }

    const isValid = user.checkPassword(password);

    return isValid;
  };
}

export default () => getCustomRepository(UserRepository);
