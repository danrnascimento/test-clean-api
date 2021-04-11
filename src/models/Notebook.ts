import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { INotebook } from '../core/Notebook/entity';

@Entity('notebooks')
export class NotebookModel implements INotebook {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column('simple-array')
  notes_ids: string[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
