import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { INoteDataProvider } from '../../../core/data_providers/Note';
import Note, { CreateNoteInput } from '../../../core/entities/Note';
import NotesModel from '../../models/note';

@EntityRepository(NotesModel)
export class NoteRepository
  extends Repository<NotesModel>
  implements INoteDataProvider {
  constructor() {
    super();
  }

  private get repo(): NoteRepository {
    return getCustomRepository(NoteRepository);
  }

  public async exists(id: string) {
    const note = await this.repo.findOne(id);
    return Boolean(note);
  }

  public async getNote(id: string) {
    try {
      const note = await this.repo.findOne(id);
      return note;
    } catch (error) {
      throw new Error(error);
    }
  }

  public createNote = async (input: CreateNoteInput) => {
    const note = new Note(input);

    try {
      await this.repo.save(note);
      return note;
    } catch (error) {
      throw new Error(error);
    }
  };

  public deleteNote = async (id: string) => {
    try {
      await this.repo.delete({ id });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  };

  public updateNote = async (id: string, input: Partial<CreateNoteInput>) => {
    const note = await this.repo.findOne({ id });

    if (!note) {
      throw new Error('note not found');
    }

    note.content = input.content;

    try {
      this.repo.save(note);
      return note;
    } catch (error) {
      throw new Error(error);
    }
  };
}
