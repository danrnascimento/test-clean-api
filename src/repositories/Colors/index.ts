import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { ColorModel } from '../../models/Color';
import PalletRepository from '../Pallets';

interface IColorService {
  getColorById: (id: string) => Promise<ColorModel | undefined>;
  createColor: (
    name: string,
    value: string,
    pallet_id: string,
  ) => Promise<ColorModel | undefined>;
  updateColor: (
    id: string,
    input: { name?: string; value?: string },
  ) => Promise<ColorModel | undefined>;
  deleteColor: (id: string) => Promise<Boolean>;
}

@EntityRepository(ColorModel)
export class ColorRepository
  extends Repository<ColorModel>
  implements IColorService {
  private getPalletRepository = () => PalletRepository();

  async getColorById(id: string) {
    const color = await this.findOne({ id });

    if (!color) {
      return;
    }

    return color;
  }

  async createColor(name: string, value: string, pallet_id: string) {
    const palletRepository = this.getPalletRepository();
    const color = this.create({ name, value, pallet_id });

    const saveUpdate = palletRepository
      .createQueryBuilder()
      .update()
      .set({
        colors_ids: () => `array_append(colors_ids, '${color.id}')`,
      })
      .where('id = :id', { id: pallet_id });

    try {
      await this.save(color);
      await saveUpdate.execute();
      return color;
    } catch (error) {
      return;
    }
  }

  async updateColor(id: string, input: { name?: string; value?: string }) {
    const color = await this.getColorById(id);

    if (!color) {
      return;
    }

    color.name = input.name || color.name;
    color.value = input.value || color.value;

    try {
      this.save(color);
      return color;
    } catch (error) {
      return;
    }
  }

  async deleteColor(id: string) {
    const palletRepository = PalletRepository();
    const color = await this.getColorById(id);

    if (!color) {
      return false;
    }

    const saveUpdate = palletRepository
      .createQueryBuilder()
      .update()
      .set({
        colors_ids: () => `array_remove(colors_ids, '${color.id}')`,
      })
      .where('id = :id', { id: color.pallet_id });

    try {
      await this.delete({ id });
      await saveUpdate.execute();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default () => getCustomRepository(ColorRepository);
