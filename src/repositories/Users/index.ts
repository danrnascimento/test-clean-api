import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IUser } from '../../core/user/entity';
import { UserModel } from '../../models/User';
import bcrypt from 'bcryptjs';

type CreateUserInput = Pick<IUser, 'email' | 'password' | 'name' | 'last_name'>;

interface IUserService {
  getUserById: (id: string) => Promise<UserModel | undefined>;
  getUserByEmail: (email: string) => Promise<UserModel | undefined>;
  createUser: (input: CreateUserInput) => Promise<UserModel | Error>;
  checkUserCredentials: (
    email: string,
    password: string,
  ) => Promise<UserModel> | Error;
}

@EntityRepository(UserModel)
class UserRepository extends Repository<UserModel> implements IUserService {
  async getUserById(id: string) {
    const user = await this.findOne({ id });

    if (!user) {
      return;
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.findOne({ email });

    if (!user) {
      return;
    }

    return user;
  }

  async createUser({ email, password, name, last_name }: CreateUserInput) {
    const userAlreadyExistis = await this.getUserByEmail(email);

    if (userAlreadyExistis) {
      return new Error('User already existis');
    }

    try {
      const user = this.create({ name, last_name, email, password });
      await this.save(user);
      return user;
    } catch (error) {
      return new Error(error);
    }
  }

  async checkUserCredentials(email: string, password: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('User does not exists');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new Error('Wrong password');
    }

    return user;
  }
}

export default () => getCustomRepository(UserRepository);
