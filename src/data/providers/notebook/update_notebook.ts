import { UpdateNotebook } from '@/core/use_cases/notebook';
import {
  CheckNotebookByIdRepository,
  UpdateNotebookRepository,
} from '../../protocols/repository/notebook';

export class UpdateNotebookProvider implements UpdateNotebook {
  constructor(
    private updateNotebookRepository: UpdateNotebookRepository,
    private checkNotebook: CheckNotebookByIdRepository,
  ) {}

  async update({
    id,
    name,
  }: UpdateNotebook.Params): Promise<UpdateNotebook.Result> {
    const exists = await this.checkNotebook.check(id);
    if (!exists) {
      throw new Error('notebook does not exists');
    }

    const notebook = await this.updateNotebookRepository.update({ id, name });
    if (!notebook) {
      throw new Error('error to update notebook name');
    }

    return notebook;
  }
}
