import { Request, Response } from 'express';
import { Pallet } from './entity';
import { PalletInput, PalletService } from './service';

const mockedPallet = PalletService.createPallet({
  name: 'Default',
  userId: 'xyz',
});

export class PalletController {
  public createPallet(req: Request, res: Response) {
    const { name, userId } = req.body as PalletInput;

    if (!name) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const user = PalletService.createPallet({
      name,
      userId,
    });

    return res.status(200).json(PalletService.getRepresentation(user));
  }

  public getPalletById(req: Request, res: Response) {
    const { palletId } = req.params;

    if (!palletId) {
      return res.status(400).json({ error: 'missing id' });
    }

    res
      .status(200)
      .json({ data: PalletService.getRepresentation(mockedPallet) });
  }

  public updatePallet(req: Request, res: Response) {
    const { palletId } = req.params;
    const { name } = req.body as Partial<Pallet>;

    if (!palletId) {
      return res.status(400).json({ error: 'missing id' });
    }

    if (!name) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const pallet = mockedPallet;

    const updatedPallet = {
      ...pallet,
      name: name ? name : mockedPallet.name,
    };

    res
      .status(200)
      .json({ data: PalletService.getRepresentation(updatedPallet) });
  }
}
