import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IPallet } from '../../core/pallet/entity';
import { PalletModel } from '../../models/Pallet';
import UserRepository from '../../repositories/Users';

interface IPalletService {
  getPalletById: (id: string) => Promise<PalletModel | undefined>;
  createPallet: (
    name: string,
    user_id: string,
  ) => Promise<PalletModel | undefined>;
  deletePallet: (id: string) => Promise<boolean>;
}

@EntityRepository(PalletModel)
export class PalletRepository
  extends Repository<PalletModel>
  implements IPalletService {
  private getUserRepository = () => UserRepository();

  async getPalletById(id: string) {
    const pallet = await this.findOne({ id });

    if (!pallet) {
      return;
    }

    return pallet;
  }

  async createPallet(name: string, user_id: string) {
    const userRepository = this.getUserRepository();

    const pallet = this.create({ name, user_id });
    const updateUser = userRepository
      .createQueryBuilder()
      .update()
      .set({
        pallets_ids: () => `array_append(pallets_ids, '${pallet.id}')`,
      })
      .where('id = :id', { id: user_id });

    try {
      await updateUser.execute();
      await this.save(pallet);
      return pallet;
    } catch (error) {
      return;
    }
  }

  async deletePallet(id: string) {
    const userRepository = this.getUserRepository();

    const pallet = await this.getPalletById(id);
    if (!pallet) {
      return false;
    }

    const updateUser = userRepository
      .createQueryBuilder()
      .update()
      .set({
        pallets_ids: () => `array_remove(pallets_ids, '${id}')`,
      })
      .where('id = :id', { id: pallet.user_id });

    try {
      await this.delete({ id });
      await updateUser.execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  async updatePallet(id: string, newName: string) {
    try {
      const pallet = await this.getPalletById(id);
      pallet.name = newName;
      await this.save(pallet);

      return pallet;
    } catch (error) {
      return;
    }
  }
}

export default () => getCustomRepository(PalletRepository);
