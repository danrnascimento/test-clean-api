import { Request, Response } from 'express';
import { IPalletController } from '../../core/pallet/controller';
import palletRepository from '../../repositories/Pallets';
import UserRepository from '../../repositories/Users';

export class PalletController implements IPalletController {
  public async createPallet(req: Request, res: Response) {
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = palletRepository();
    const userRepository = UserRepository();

    try {
      const pallet = repository.create({ name, user_id });
      const saveUpdate = userRepository
        .createQueryBuilder()
        .update()
        .set({
          pallets_ids: () => `array_append(pallets_ids, '${pallet.id}')`,
        })
        .where('id = :id', { id: user_id });

      await saveUpdate.execute();
      await repository.save(pallet);
      return res.status(200).json({ data: pallet });
    } catch (error) {
      return res.status(200).json({ error });
    }
  }

  public async getPalletById(req: Request, res: Response) {
    const { palletId } = req.params;

    if (!palletId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = palletRepository();
    const pallet = await repository.findOne({ id: palletId });

    if (!pallet) {
      return res.status(400).json({ error: 'pallet not found' });
    }

    return res.status(200).json({ data: pallet });
  }

  public async removePallet(req: Request, res: Response) {
    const { palletId } = req.params;

    if (!palletId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = palletRepository();
    const userRepository = UserRepository();
    const pallet = await repository.findOne({ id: palletId });

    const saveUpdate = userRepository
      .createQueryBuilder()
      .update()
      .set({
        pallets_ids: () => `array_remove(pallets_ids, '${pallet.id}')`,
      })
      .where('id = :id', { id: pallet.user_id });

    await repository.delete({ id: pallet.id });
    await saveUpdate.execute();

    return res.status(200).json({ data: 'success' });
  }

  public async updatePallet(req: Request, res: Response) {
    const { palletId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'missing property' });
    }

    const repository = palletRepository();

    const pallet = await repository.findOne({ id: palletId });
    pallet.name = name;

    repository.save(pallet);
    return res.status(200).json({ data: pallet });
  }
}
