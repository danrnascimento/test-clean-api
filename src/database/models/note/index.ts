import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { INote } from '../../../core/entities/Note';

const NOTES_TABLE = 'notes';

@Entity(NOTES_TABLE)
export default class NotesModel implements INote {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
