import { Request, Response } from 'express';
import { IColorController } from '../../core/color/controller';
import colorRepository from '../../repositories/Colors';

export class ColorController implements IColorController {
  public async createColor(req: Request, res: Response) {
    const { name, value, palletId } = req.body;

    if (!name || !value || !palletId) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = colorRepository();

    const color = repository.create({ name, value, palletId });
    await repository.save(color);

    return res.status(200).json({ data: color });
  }

  public async getColorById(req: Request, res: Response) {
    const { colorId } = req.params;

    if (!colorId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = colorRepository();
    const color = await repository.findOne({ id: colorId });

    if (!color) {
      return res.status(400).json({ error: 'color not found' });
    }

    return res.status(200).json({ data: color });
  }

  public async updateColor(req: Request, res: Response) {
    return res.status(200).json({ data: {} });
  }
}
