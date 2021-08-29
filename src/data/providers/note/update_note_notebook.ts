import { UpdateNoteNotebook } from '@/core/use_cases/note';
import {
  CheckNoteByIdRepository,
  UpdateNoteNotebookRepository,
} from '../../protocols/repository/note';

export class UpdateNoteNotebookProvider implements UpdateNoteNotebook {
  constructor(
    private updateNoteRepository: UpdateNoteNotebookRepository,
    private checkNoteRepository: CheckNoteByIdRepository,
  ) {}

  async updateNotebook({
    id,
    notebook_id,
  }: UpdateNoteNotebook.Params): Promise<UpdateNoteNotebook.Result> {
    const exists = this.checkNoteRepository.check(id);
    if (!exists) {
      throw new Error('note does not exists');
    }

    const note = await this.updateNoteRepository.updateNotebook({
      id,
      notebook_id,
    });

    if (!note) {
      throw new Error('error to update the note');
    }

    return note;
  }
}
