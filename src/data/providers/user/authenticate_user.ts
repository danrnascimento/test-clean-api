import { AuthenticateUser } from '@/core/use_cases';
import { CompareHash } from '../../protocols/crypto';
import { GetUserByUsernameRepository } from '../../protocols/repository';

export class AuthenticateUserProvider implements AuthenticateUser {
  constructor(
    private repository: GetUserByUsernameRepository,
    private cryptoCompare: CompareHash,
  ) {}

  async authenticate(
    credentials: AuthenticateUser.Params,
  ): Promise<AuthenticateUser.Result> {
    const user = await this.repository.getByUsername(credentials.username);

    if (!user) {
      throw new Error('user not found');
    }

    const passwordIsValid = await this.cryptoCompare.compare(
      credentials.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new Error('wrong password');
    }

    return passwordIsValid;
  }
}
