import { Request, Response } from 'express';
import { IColorController } from '../../core/color/controller';
import colorRepository from '../../repositories/Colors';
import PalletRepository from '../../repositories/Pallets';

export class ColorController implements IColorController {
  public async createColor(req: Request, res: Response) {
    const { name, value, pallet_id } = req.body;

    if (!name || !value || !pallet_id) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = colorRepository();

    try {
      const color = await repository.createColor(name, value, pallet_id);
      return res.status(200).json({ data: color });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async getColorById(req: Request, res: Response) {
    const { colorId } = req.params;

    if (!colorId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = colorRepository();
    const color = await repository.getColorById(colorId);

    if (!color) {
      return res.status(400).json({ error: 'color not found' });
    }

    return res.status(200).json({ data: color });
  }

  public async removeColor(req: Request, res: Response) {
    const { colorId } = req.params;

    if (!colorId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = colorRepository();

    try {
      const success = await repository.deleteColor(colorId);
      if (!success) {
        return res.status(500).json({ error: 'error' });
      }

      return res.status(200).json({ data: 'success' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async updateColor(req: Request, res: Response) {
    const { colorId } = req.params;
    const { name, value } = req.body;

    if (!colorId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = colorRepository();

    try {
      const color = await repository.updateColor(colorId, { name, value });
      return res.status(200).json({ data: color });
    } catch (error) {
      return res.status(200).json({ error });
    }
  }
}
