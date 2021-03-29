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
    const palletRepository = PalletRepository();

    try {
      const color = repository.create({ name, value, pallet_id });

      const saveUpdate = palletRepository
        .createQueryBuilder()
        .update()
        .set({
          colors_ids: () => `array_append(colors_ids, '${color.id}')`,
        })
        .where('id = :id', { id: pallet_id });

      await repository.save(color);
      await saveUpdate.execute();

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
    const color = await repository.findOne({ id: colorId });

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
    const palletRepository = PalletRepository();

    const color = await repository.findOne({ id: colorId });

    try {
      const saveUpdate = palletRepository
        .createQueryBuilder()
        .update()
        .set({
          colors_ids: () => `array_remove(colors_ids, '${color.id}')`,
        })
        .where('id = :id', { id: color.pallet_id });

      await repository.delete({ id: colorId });
      await saveUpdate.execute();

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
    const color = await repository.findOne({ id: colorId });

    if (!color) {
      return res.status(400).json({ error: 'color not found' });
    }

    color.name = name;
    color.value = value;

    await repository.save(color);
    return res.status(200).json({ data: color });
  }
}
