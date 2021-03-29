import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IPallet } from '../core/pallet/entity';

@Entity('pallets')
export class PalletModel implements IPallet {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column('simple-array')
  colors_ids: string[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
