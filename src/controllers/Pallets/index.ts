import { Request, Response } from 'express';
import { IPalletController } from '../../core/pallet/controller';
import palletRepository from '../../repositories/Pallets';

export class PalletController implements IPalletController {
  public async createPallet(req: Request, res: Response) {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = palletRepository();

    const pallet = repository.create({ name, userId });
    await repository.save(pallet);

    return res.status(200).json({ data: pallet });
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

  public async updatePallet(req: Request, res: Response) {
    return res.status(200).json({ data: {} });
  }
}
