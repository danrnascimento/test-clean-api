import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { INote } from '../core/Note/entity';

@Entity('notes')
export class NoteModel implements INote {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  notebook_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
