import { GetNotebookById } from '@/core/use_cases/notebook';
import { GetNotebookByIdRepository } from '../../protocols/repository/notebook';

export class GetNotebookByIdProvider implements GetNotebookById {
  constructor(private repository: GetNotebookByIdRepository) {}

  async get(
    notebook_id: GetNotebookById.Params,
  ): Promise<GetNotebookById.Result> {
    const notebook = await this.repository.get(notebook_id);

    if (!notebook) {
      throw new Error('notebook not found');
    }

    return notebook;
  }
}
