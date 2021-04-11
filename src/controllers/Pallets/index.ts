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

    try {
      const pallet = await repository.createPallet(name, user_id);
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
    const pallet = await repository.getPalletById(palletId);

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
    const success = await repository.deletePallet(palletId);

    if (!success) {
      return res.status(500).json({ error: 'error' });
    }

    return res.status(200).json({ data: 'success' });
  }

  public async updatePallet(req: Request, res: Response) {
    const { palletId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'missing property' });
    }

    const repository = palletRepository();
    const pallet = await repository.updatePallet(palletId, name);

    if (!pallet) {
      return res.status(500).json({ error: 'error' });
    }

    return res.status(200).json({ data: pallet });
  }
}
