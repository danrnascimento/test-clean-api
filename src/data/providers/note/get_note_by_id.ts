import { GetNoteById } from '@/core/use_cases/note';
import { GetNoteByIdRepository } from '../../protocols/repository/note';

export class GetNoteByIdProvider implements GetNoteById {
  constructor(private repository: GetNoteByIdRepository) {}

  async get(note_id: GetNoteById.Params): Promise<GetNoteById.Result> {
    const note = await this.repository.get(note_id);

    if (!note) {
      throw new Error('note not found');
    }

    return note;
  }
}
