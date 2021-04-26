import Note, { CreateNoteInput } from '../../entities/Note';

export interface INoteDataProvider {
  exists: (id: string) => Promise<boolean>;
  getNote: (id: string) => Promise<Note>;
  createNote: (input: CreateNoteInput) => Promise<Note>;
  deleteNote: (id: string) => Promise<boolean>;
  updateNote: (id: string, input: Partial<CreateNoteInput>) => Promise<Note>;
}
