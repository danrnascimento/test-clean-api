import { Request, Response } from 'express';
import { PalletService } from './service';

const mockedPallet = PalletService.createPallet({
  name: 'Default',
  userId: 'xyz',
});

export class PalletController {
  public getPalletById(req: Request, res: Response) {
    const { palletId } = req.params;

    if (!palletId) {
      return res.status(400).json({ error: 'missing id' });
    }

    res
      .status(200)
      .json({ data: PalletService.getRepresentation(mockedPallet) });
  }
}
