import { UpdateUserPassword } from '@/core/use_cases';
import { Hasher } from '../../protocols/crypto';
import {
  UpdateUserPasswordRepository,
  UserExistsRepository,
} from '../../protocols/repository';

export class UpdateUserPasswordProvider implements UpdateUserPassword {
  constructor(
    private updatePasswordRepository: UpdateUserPasswordRepository,
    private userExistsRepository: UserExistsRepository,
    private hasher: Hasher,
  ) {}

  async updatePassword({
    id,
    password,
  }: UpdateUserPassword.Params): Promise<UpdateUserPassword.Result> {
    const exists = await this.userExistsRepository.exists(id);
    if (!exists) {
      throw new Error('user does not exists');
    }

    const hashedPassword = await this.hasher.hash(password);
    const user = await this.updatePasswordRepository.updatePassword({
      id,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error('error on password update');
    }

    return user;
  }
}
