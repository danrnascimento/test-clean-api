import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IPallet } from '../core/pallet/entity';
import { ColorModel } from './Color';
import { UserModel } from './User';

@Entity('pallets')
export class PalletModel implements IPallet {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @OneToMany(() => ColorModel, (color) => color.palletId)
  colors: ColorModel[];

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
