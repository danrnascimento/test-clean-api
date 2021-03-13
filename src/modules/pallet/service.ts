import { v4 } from 'uuid';
import { Color } from '../color';
import { Pallet } from '../pallet';

export type PalletInput = Pick<Pallet, 'name' | 'userId'>;

export class PalletService {
  public static createPallet({ name, userId }: PalletInput): Pallet {
    return {
      id: v4(),
      colorsIds: [],
      name,
      userId,
    };
  }

  public static removeColors(
    idsToRemove: string[],
    currentColors: Color[],
  ): Color[] {
    const newColors = currentColors.filter(
      (color) => !idsToRemove.includes(color.id),
    );
    return newColors;
  }

  public static addColors(
    colorsToAdd: Color[],
    currentColors: Color[],
  ): Color[] {
    return [...colorsToAdd, ...currentColors];
  }
}
