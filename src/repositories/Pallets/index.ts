import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { PalletModel } from '../../models/Pallet';

@EntityRepository(PalletModel)
export class PalletRepository extends Repository<PalletModel> {}

export default () => getCustomRepository(PalletRepository);
