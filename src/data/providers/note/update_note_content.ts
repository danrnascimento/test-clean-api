import { UpdateNoteContent } from '@/core/use_cases/note';
import {
  CheckNoteByIdRepository,
  UpdateNoteContentRepository,
} from '../../protocols/repository/note';

export class UpdateNoteContentProvider implements UpdateNoteContent {
  constructor(
    private updateNoteRepository: UpdateNoteContentRepository,
    private checkNoteRepository: CheckNoteByIdRepository,
  ) {}

  async updateContent({
    id,
    content,
  }: UpdateNoteContent.Params): Promise<UpdateNoteContent.Result> {
    const exists = this.checkNoteRepository.check(id);
    if (!exists) {
      throw new Error('note does not exists');
    }

    const note = await this.updateNoteRepository.updateContent({
      id,
      content,
    });

    if (!note) {
      throw new Error('error to update the note');
    }

    return note;
  }
}
