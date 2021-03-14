import { v4 } from 'uuid';
import { Color } from '../color';
import { Pallet } from '../pallet';
import { PalletRepresentation } from './entity';

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

  public static getRepresentation(pallet: Pallet): PalletRepresentation {
    const representation = pallet;
    delete representation.colorsIds;

    return { ...representation, colors: [] };
  }
}
