import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { INotebookDataProvider } from '../../../core/data_providers/Notebook';
import Notebook, { CreateNotebookInput } from '../../../core/entities/Notebook';
import { NotebooksModel } from '../../models/notebook';

@EntityRepository(NotebooksModel)
export class NotebookRepository
  extends Repository<NotebooksModel>
  implements INotebookDataProvider {
  private get repo(): NotebookRepository {
    return getCustomRepository(NotebookRepository);
  }

  async getById(id: string) {
    const notebook = await this.repo.findOne({ id });

    if (!notebook) {
      return;
    }

    return notebook;
  }

  async createNotebook(input: CreateNotebookInput) {
    const notebook = new Notebook(input);

    try {
      await this.repo.save(notebook);
      return notebook;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteNotebook(id: string) {
    try {
      await this.repo.delete({ id });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateNotebook(id: string, input: Partial<CreateNotebookInput>) {
    try {
      const notebook = await this.getById(id);
      notebook.name = input.name || notebook.name;
      await this.repo.save(notebook);
      return notebook;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNote(id: string, note_id: string) {
    const updateAction = this.repo
      .createQueryBuilder()
      .update()
      .set({
        notes_ids: () => `array_append(notes_ids, '${note_id}')`,
      })
      .where('id = :id', { id });

    try {
      const notebook = await updateAction.execute();
      return (notebook as unknown) as Notebook;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeNote(id: string, note_id: string) {
    const updateAction = this.repo
      .createQueryBuilder()
      .update()
      .set({
        notes_ids: () => `array_remove(notes_ids, '${note_id}')`,
      })
      .where('id = :id', { id });

    try {
      const notebook = await updateAction.execute();
      return (notebook as unknown) as Notebook;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default () => getCustomRepository(NotebookRepository);
