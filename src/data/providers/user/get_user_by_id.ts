import { GetUserById } from '@/core/use_cases';
import { GetUserByIdRepository } from '../../protocols/repository';

export class GetUserByIdProvider implements GetUserById {
  constructor(private repository: GetUserByIdRepository) {}

  async get(id: GetUserById.Params): Promise<GetUserById.Result> {
    const user = await this.repository.get(id);

    if (!user) {
      throw new Error('user not found');
    }

    return user;
  }
}
