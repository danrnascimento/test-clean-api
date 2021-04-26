import { INoteDataProvider } from '../../data_providers/Note';
import { INotebookDataProvider } from '../../data_providers/Notebook';
import Note, { CreateNoteInput } from '../../entities/Note';

export interface INoteCases {
  getNote: (id: string) => Promise<Note>;
  createNote: (input: CreateNoteInput) => Promise<Note>;
  updateNote: (id: string, input: Partial<CreateNoteInput>) => Promise<Note>;
  deleteNote: (id: string) => Promise<boolean>;
}

export class NoteCases implements INoteCases {
  constructor(private repository: INoteDataProvider) {}

  public getNote = async (id: string) => {
    try {
      const note = await this.repository.getNote(id);
      return note;
    } catch (error) {
      throw new Error(error);
    }
  };

  public createNote = async (input: CreateNoteInput) => {
    try {
      const note = await this.repository.createNote(input);
      return note;
    } catch {
      throw new Error('error to create');
    }
  };

  public deleteNote = async (id: string) => {
    try {
      const success = await this.repository.deleteNote(id);

      if (!success) {
        throw new Error('error to delete');
      }

      return success;
    } catch {
      throw new Error('error to delete');
    }
  };

  public updateNote = async (id: string, input: Partial<CreateNoteInput>) => {
    try {
      const note = await this.repository.updateNote(id, input);
      return note;
    } catch {
      throw new Error('error to update');
    }
  };
}
