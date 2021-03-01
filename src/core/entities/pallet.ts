import Color from './color';

export type Pallet = {
  id: string;
  name: string;
  userId: string;
  colorsIds: string[];
};

export type PalletRepresentation = Omit<Pallet, 'userId' | 'colorsIds'> & {
  colors: Color[];
};
