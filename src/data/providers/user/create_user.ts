import { CreateUser } from '@/core/use_cases';
import { Hasher } from '../../protocols/crypto';
import {
  CheckUsernameRepository,
  CreateUserRepository,
  GetUserByUsernameRepository,
} from '../../protocols/repository';

export class CreateUserProvider implements CreateUser {
  constructor(
    private createUserRepository: CreateUserRepository,
    private checkUsernameRepository: CheckUsernameRepository,
    private hasher: Hasher,
  ) {}

  async create({
    username,
    password,
  }: CreateUser.Params): Promise<CreateUser.Result> {
    const userUsername = await this.checkUsernameRepository.checkUsername(
      username,
    );

    console.log(userUsername);
    if (userUsername) {
      throw new Error('username already user');
    }

    const hashedPassword = await this.hasher.hash(password);
    const user = await this.createUserRepository.create({
      username,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error('error on user creation');
    }

    return user;
  }
}
