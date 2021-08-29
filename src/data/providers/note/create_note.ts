import { CreateNote } from '@/core/use_cases/note';
import { CreateNoteRepository } from '../../protocols/repository/note';

export class CreateNoteProvider implements CreateNote {
  constructor(private repository: CreateNoteRepository) {}

  async create(data: CreateNote.Params): Promise<CreateNote.Result> {
    const note = await this.repository.create(data);

    if (!note) {
      throw new Error('error to create the note');
    }

    return note;
  }
}
