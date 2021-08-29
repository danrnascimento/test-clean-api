import { UpdateUserUsername } from '@/core/use_cases';
import {
  CheckUsernameRepository,
  UpdateUserUsernameRepository,
  UserExistsRepository,
} from '../../protocols/repository';

export class UpdateUserUsernameProvider implements UpdateUserUsername {
  constructor(
    private updateUsernameRepository: UpdateUserUsernameRepository,
    private userExistsRepository: UserExistsRepository,
    private checkUsernameRepository: CheckUsernameRepository,
  ) {}

  async updateUsername({
    id,
    username,
  }: UpdateUserUsername.Params): Promise<UpdateUserUsername.Result> {
    const userExists = await this.userExistsRepository.exists(id);

    if (!userExists) {
      throw new Error('user does not exists');
    }

    const usedUsername = await this.checkUsernameRepository.checkUsername(
      username,
    );

    if (usedUsername) {
      throw new Error('username is already used');
    }

    const user = await this.updateUsernameRepository.updateUsername({
      id,
      username,
    });

    if (!user) {
      throw new Error('error to update the username');
    }

    return user;
  }
}
