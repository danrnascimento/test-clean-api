import { DeleteNotebook } from '@/core/use_cases/notebook';
import {
  CheckNotebookByIdRepository,
  DeleteNotebookRepository,
} from '../../protocols/repository/notebook';

export class DeleteNotebookProvider implements DeleteNotebook {
  constructor(
    private deleteRepository: DeleteNotebookRepository,
    private checkNotebookRepository: CheckNotebookByIdRepository,
  ) {}

  async delete(notebook_id: string): Promise<DeleteNotebook.Result> {
    const exists = this.checkNotebookRepository.check(notebook_id);
    if (!exists) {
      throw new Error('exists');
    }

    const deleted = await this.deleteRepository.delete(notebook_id);
    if (!deleted) {
      throw new Error('error to delete this notebook');
    }

    return deleted;
  }
}
