import { v4 } from 'uuid';
import Pallet from '../entities/pallet';
import User from '../entities/user';

type UserInput = Pick<User, 'name' | 'lastName' | 'email' | 'password'>;

export default class PalletCases {
  static createUser = ({
    name,
    lastName,
    email,
    password,
  }: UserInput): User => {
    const id = v4();
    return {
      id,
      name,
      lastName,
      email,
      password,
      pallets: [],
    };
  };

  static addPallet = (palletsToAdd: Pallet[], currentPallets: Pallet[]) => {
    return [...palletsToAdd, ...currentPallets];
  };

  static removePallets = (
    idsToRemove: string[],
    currentPallets: Pallet[],
  ): Pallet[] => {
    const newPallets = currentPallets.filter(
      (pallet) => !idsToRemove.includes(pallet.id),
    );
    return newPallets;
  };
}
