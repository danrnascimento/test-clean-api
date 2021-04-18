import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { User } from '../../../../entities/User';

@Entity('users')
export class UserModel extends User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  _password: string;

  @Column('simple-array')
  notebooks_ids: string[];

  @CreateDateColumn()
  created_at: Date;
}
