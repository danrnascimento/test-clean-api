import { DeleteNote } from '@/core/use_cases/note';
import {
  CheckNoteByIdRepository,
  DeleteNoteRepository,
} from '../../protocols/repository/note';

export class DeleteNoteProvider implements DeleteNote {
  constructor(
    private deleteRepository: DeleteNoteRepository,
    private checkNoteRepository: CheckNoteByIdRepository,
  ) {}

  async delete(note_id: DeleteNote.Params): Promise<DeleteNote.Result> {
    const exists = await this.checkNoteRepository.check(note_id);
    if (!exists) {
      throw new Error('note does not exists');
    }

    const deleted = await this.deleteRepository.delete(note_id);
    if (!deleted) {
      throw new Error('error to delete the note');
    }

    return deleted;
  }
}
