import { PalletRepresentation } from './pallet';

type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  palletsIds: string[];
};

export type UserRepresentation = Omit<User, 'password' | 'palletsIds'> & {
  pallets: PalletRepresentation[];
};

export default User;
