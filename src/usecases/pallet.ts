import { v4 } from 'uuid';
import Color from '../entities/color';
import Pallet from '../entities/pallet';

type PalletInput = Pick<Pallet, 'name'>;

export default class PalletCases {
  static createPallet = ({ name }: PalletInput): Pallet => {
    return {
      id: v4(),
      colors: [],
      name,
    };
  };

  static removeColors = (
    idsToRemove: string[],
    currentColors: Color[],
  ): Color[] => {
    const newColors = currentColors.filter(
      (color) => !idsToRemove.includes(color.id),
    );
    return newColors;
  };

  static addColors = (
    colorsToAdd: Color[],
    currentColors: Color[],
  ): Color[] => {
    return [...colorsToAdd, ...currentColors];
  };
}
