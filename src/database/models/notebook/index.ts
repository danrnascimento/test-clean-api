import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { INotebook } from '../../../core/entities/Notebook';

const NOTEBOOKS_TABLE = 'notebooks';

@Entity(NOTEBOOKS_TABLE)
export class NotebooksModel implements INotebook {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column('simple-array')
  notes_ids: string[];

  @CreateDateColumn()
  created_at: Date;
}
