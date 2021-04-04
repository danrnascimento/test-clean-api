import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IUser } from '../core/user/entity';
import bcrypt from 'bcryptjs';

@Entity('users')
export class UserModel implements IUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('simple-array')
  pallets_ids: string[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
