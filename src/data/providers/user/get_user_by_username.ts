import { GetUserByUsername } from '@/core/use_cases';
import { GetUserByUsernameRepository } from '../../protocols/repository';

export class GetUserByUsernameProvider implements GetUserByUsername {
  constructor(private repository: GetUserByUsernameRepository) {}

  async getByUsername(
    username: GetUserByUsername.Params,
  ): Promise<GetUserByUsername.Result> {
    const user = await this.repository.getByUsername(username);

    if (!user) {
      throw new Error('user not found');
    }

    return user;
  }
}
