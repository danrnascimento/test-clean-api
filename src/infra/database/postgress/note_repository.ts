import { Note } from '@/core/entities';

import {
  CheckNoteByIdRepository,
  CreateNoteRepository,
  DeleteNoteRepository,
  GetNoteByIdRepository,
  UpdateNoteContentRepository,
  UpdateNoteNotebookRepository,
} from '@/data/protocols/repository';

import { PostgreHelper } from './config/helper';

interface NoteRepositoryInterfaces
  extends GetNoteByIdRepository,
    CreateNoteRepository,
    DeleteNoteRepository,
    CheckNoteByIdRepository,
    UpdateNoteContentRepository,
    UpdateNoteNotebookRepository {}

export class NoteRepository implements NoteRepositoryInterfaces {
  public async get(
    note_id: GetNoteByIdRepository.Params,
  ): Promise<GetNoteByIdRepository.Result> {
    try {
      const result = await PostgreHelper.query<Note>(
        `SELECT id, content, created_at FROM notes WHERE id = '${note_id}';`,
      );

      const noteExists = Boolean(result.rowCount);
      if (!noteExists) {
        return null;
      }

      const note = result.rows[0];

      return note;
    } catch (error) {
      return null;
    }
  }

  public async check(
    note_id: CheckNoteByIdRepository.Params,
  ): Promise<CheckNoteByIdRepository.Result> {
    try {
      const result = await PostgreHelper.query<Note>(
        `SELECT 1 FROM notes WHERE id = '${note_id}';`,
      );

      return Boolean(result.rowCount);
    } catch (error) {
      return null;
    }
  }

  public async create({
    notebook_id,
    content,
  }: CreateNoteRepository.Params): Promise<CreateNoteRepository.Result> {
    try {
      const result = await PostgreHelper.query<Note>(
        `INSERT INTO notes (notebook_id, content) VALUES ('${notebook_id}', '${content}') RETURNING *;`,
      );

      const noteCreated = Boolean(result.rowCount);
      if (!noteCreated) {
        return null;
      }

      const note = result.rows[0];

      return note;
    } catch (error) {
      return null;
    }
  }

  public async updateContent({
    id,
    content,
  }: UpdateNoteContentRepository.Params): Promise<UpdateNoteContentRepository.Result> {
    try {
      const result = await PostgreHelper.query<Note>(
        `UPDATE notes SET content = '${content}' WHERE id = '${id}' RETURNING *;`,
      );

      const updateSuccess = Boolean(result.rowCount);
      if (!updateSuccess) {
        return null;
      }

      const note = result.rows[0];

      return note;
    } catch (error) {
      return null;
    }
  }

  public async updateNotebook({
    id,
    notebook_id,
  }: UpdateNoteNotebookRepository.Params): Promise<UpdateNoteNotebookRepository.Result> {
    try {
      const notebookResult = await PostgreHelper.query<Note>(
        `SELECT 1 FROM notebooks WHERE id = '${notebook_id}';`,
      );

      const notebookExists = Boolean(notebookResult.rowCount);
      if (!notebookExists) {
        return null;
      }

      const result = await PostgreHelper.query<Note>(
        `UPDATE notes SET notebook_id = '${notebook_id}' WHERE id = '${id}' RETURNING *;`,
      );

      const updateSuccess = Boolean(result.rowCount);
      if (!updateSuccess) {
        return null;
      }

      const note = result.rows[0];

      return note;
    } catch (error) {
      return null;
    }
  }

  public async delete(
    note_id: DeleteNoteRepository.Params,
  ): Promise<DeleteNoteRepository.Result> {
    try {
      const result = await PostgreHelper.query<Note>(
        `DELETE FROM notes WHERE id = '${note_id}' RETURNING id;`,
      );

      return Boolean(result.rowCount);
    } catch (error) {
      return null;
    }
  }
}
