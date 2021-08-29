import { GetNotesByNotebook } from '@/core/use_cases/notebook';
import {
  GetNotesByNotebookRepository,
  CheckNotebookByIdRepository,
} from '../../protocols/repository/notebook';

export class GetNotesByNotebookProvider implements GetNotesByNotebook {
  constructor(
    private getNotesRepository: GetNotesByNotebookRepository,
    private checkNotebookRepository: CheckNotebookByIdRepository,
  ) {}

  async getNotes(
    notebook_id: GetNotesByNotebook.Params,
  ): Promise<GetNotesByNotebook.Result> {
    const exits = await this.checkNotebookRepository.check(notebook_id);

    if (!exits) {
      throw new Error('notebook does not exists');
    }

    const notes = await this.getNotesRepository.getNotes(notebook_id);

    if (!notes) {
      throw new Error('notes not found');
    }

    return notes;
  }
}
