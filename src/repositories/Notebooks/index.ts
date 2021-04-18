import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { INotebook } from '../../core/Notebook/entity';
import { NotebookModel } from '../../models/Notebook';
import UserRepository from '../User/implementation/TypeORM';

interface INotebookService {
  getNotebookById: (id: string) => Promise<NotebookModel | undefined>;
  createNotebook: (
    name: string,
    user_id: string,
  ) => Promise<NotebookModel | undefined>;
  deleteNotebook: (id: string) => Promise<boolean>;
}

@EntityRepository(NotebookModel)
export class NotebookRepository
  extends Repository<NotebookModel>
  implements INotebookService {
  private getUserRepository = () => UserRepository();

  async getNotebookById(id: string) {
    const notebook = await this.findOne({ id });

    if (!notebook) {
      return;
    }

    return notebook;
  }

  async createNotebook(name: string, user_id: string) {
    const userRepository = this.getUserRepository();

    const notebook = this.create({ name, user_id });
    const updateUser = userRepository
      .createQueryBuilder()
      .update()
      .set({
        notebooks_ids: () => `array_append(notebooks_ids, '${notebook.id}')`,
      })
      .where('id = :id', { id: user_id });

    try {
      await updateUser.execute();
      await this.save(notebook);
      return notebook;
    } catch (error) {
      return;
    }
  }

  async deleteNotebook(id: string) {
    const userRepository = this.getUserRepository();

    const notebook = await this.getNotebookById(id);
    if (!notebook) {
      return false;
    }

    const updateUser = userRepository
      .createQueryBuilder()
      .update()
      .set({
        notebooks_ids: () => `array_remove(notebooks_ids, '${id}')`,
      })
      .where('id = :id', { id: notebook.user_id });

    try {
      await this.delete({ id });
      await updateUser.execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateNotebook(id: string, newName: string) {
    try {
      const notebook = await this.getNotebookById(id);
      notebook.name = newName;
      await this.save(notebook);

      return notebook;
    } catch (error) {
      return;
    }
  }
}

export default () => getCustomRepository(NotebookRepository);
