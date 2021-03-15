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
import { IColor } from '../core/color/entity';
import { IPallet } from '../core/pallet/entity';
import { UserModel } from './User';

@Entity('colors')
export class ColorModel implements IColor {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  palletId: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
