import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IColor } from '../core/color/entity';

@Entity('colors')
export class ColorModel implements IColor {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  pallet_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}