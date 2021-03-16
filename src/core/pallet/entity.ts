export interface IPallet {
  readonly id: string;
  name: string;
  userId: string;
  colorsIds: string[];
  createdAt: Date;
}
