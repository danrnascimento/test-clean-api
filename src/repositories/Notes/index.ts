import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { NoteModel } from '../../models/Note';
import NotebookRepository from '../Notebooks';

interface INoteService {
  getNoteById: (id: string) => Promise<NoteModel | undefined>;
  createNote: (
    name: string,
    value: string,
    notebook_id: string,
  ) => Promise<NoteModel | undefined>;
  updateNote: (
    id: string,
    input: { name?: string; value?: string },
  ) => Promise<NoteModel | undefined>;
  deleteNote: (id: string) => Promise<Boolean>;
}

@EntityRepository(NoteModel)
export class NoteRepository
  extends Repository<NoteModel>
  implements INoteService {
  private getNotebookRepository = () => NotebookRepository();

  async getNoteById(id: string) {
    const note = await this.findOne({ id });

    if (!note) {
      return;
    }

    return note;
  }

  async createNote(name: string, value: string, notebook_id: string) {
    const notebookRepository = this.getNotebookRepository();
    const note = this.create({ name, value, notebook_id });

    const saveUpdate = notebookRepository
      .createQueryBuilder()
      .update()
      .set({
        notes_ids: () => `array_append(notes_ids, '${note.id}')`,
      })
      .where('id = :id', { id: notebook_id });

    try {
      await this.save(note);
      await saveUpdate.execute();
      return note;
    } catch (error) {
      return;
    }
  }

  async updateNote(id: string, input: { name?: string; value?: string }) {
    const note = await this.getNoteById(id);

    if (!note) {
      return;
    }

    note.name = input.name || note.name;
    note.value = input.value || note.value;

    try {
      this.save(note);
      return note;
    } catch (error) {
      return;
    }
  }

  async deleteNote(id: string) {
    const notebookRepository = NotebookRepository();
    const note = await this.getNoteById(id);

    if (!note) {
      return false;
    }

    const saveUpdate = notebookRepository
      .createQueryBuilder()
      .update()
      .set({
        notes_ids: () => `array_remove(notes_ids, '${note.id}')`,
      })
      .where('id = :id', { id: note.notebook_id });

    try {
      await this.delete({ id });
      await saveUpdate.execute();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default () => getCustomRepository(NoteRepository);
