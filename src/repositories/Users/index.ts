import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { UserModel } from '../../models/User';

@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {}

export default () => getCustomRepository(UserRepository);
