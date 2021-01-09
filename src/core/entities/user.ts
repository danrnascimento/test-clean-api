import Pallet from './pallet';

type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  pallets: Pallet[];
};

export default User;
