import { Note, Notebook } from '@/core/entities';
import {
  CheckNotebookByIdRepository,
  CreateNotebookRepository,
  DeleteNotebookRepository,
  GetNotebookByIdRepository,
  GetNotesByNotebookRepository,
  UpdateNotebookRepository,
} from '@/data/protocols/repository';

import { PostgreHelper } from './config/helper';

interface NotebookRepositoryInterface
  extends GetNotebookByIdRepository,
    CreateNotebookRepository,
    UpdateNotebookRepository,
    DeleteNotebookRepository,
    CheckNotebookByIdRepository,
    GetNotesByNotebookRepository {}

type NotebookRepositoryData = Omit<Notebook, 'notes'>;

export class NotebookRepository implements NotebookRepositoryInterface {
  public async get(
    id: GetNotebookByIdRepository.Params,
  ): Promise<GetNotebookByIdRepository.Result> {
    try {
      const result = await PostgreHelper.query<NotebookRepositoryData>(
        `SELECT * FROM notebooks WHERE id = '${id}';`,
      );

      const notebookExists = Boolean(result.rowCount);
      if (!notebookExists) {
        return null;
      }

      const notes = (await this.getNotes(id)) || [];

      const notebook: Notebook = {
        ...result.rows[0],
        notes,
      };

      return notebook;
    } catch (error) {
      console.error('[NotebookRepository] [get]', error);
      return null;
    }
  }

  public async create({
    name,
    user_id,
  }: CreateNotebookRepository.Params): Promise<CreateNotebookRepository.Result> {
    try {
      const result = await PostgreHelper.query<NotebookRepositoryData>(
        `INSERT INTO notebooks (name, user_id) VALUES ('${name}', '${user_id}') RETURNING *;`,
      );

      const notebookCreated = Boolean(result.rowCount);
      if (!notebookCreated) {
        return null;
      }

      const notebook: Notebook = {
        ...result.rows[0],
        notes: [],
      };

      return notebook;
    } catch (error) {
      console.error('[NotebookRepository] [create]', error);
      return null;
    }
  }

  public async update({
    id,
    name,
  }: UpdateNotebookRepository.Params): Promise<UpdateNotebookRepository.Result> {
    try {
      const result = await PostgreHelper.query<NotebookRepositoryData>(
        `UPDATE notebooks SET name = '${name}' WHERE id = '${id}' RETURNING *;`,
      );

      const updateSuccess = Boolean(result.rowCount);
      if (!updateSuccess) {
        return null;
      }

      const notes = (await this.getNotes(id)) || [];

      const notebook: Notebook = {
        ...result.rows[0],
        notes,
      };

      return notebook;
    } catch (error) {
      console.error('[NotebookRepository] [update]', error);
      return null;
    }
  }

  public async delete(id: string): Promise<DeleteNotebookRepository.Result> {
    try {
      const result = await PostgreHelper.query<NotebookRepositoryData>(
        `DELETE FROM notebooks WHERE id = '${id}' RETURNING id;`,
      );

      return Boolean(result.rowCount);
    } catch (error) {
      console.error('[NotebookRepository] [delete]', error);
      return null;
    }
  }

  public async check(id: string): Promise<CheckNotebookByIdRepository.Result> {
    try {
      const result = await PostgreHelper.query<NotebookRepositoryData>(
        `SELECT 1 FROM notebooks WHERE id = '${id}';`,
      );

      return Boolean(result.rows[0]);
    } catch (error) {
      console.error('[NotebookRepository] [check]', error);
      return null;
    }
  }

  public async getNotes(
    id: GetNotesByNotebookRepository.Params,
  ): Promise<GetNotesByNotebookRepository.Result> {
    try {
      const result = await PostgreHelper.query<Note>(
        `SELECT * FROM notes WHERE notebook_id = '${id}';`,
      );

      return result.rows || [];
    } catch (error) {
      console.error('[NotebookRepository] [getNotes]', error);
      return null;
    }
  }
}
