import { CreateNotebook } from '@/core/use_cases/notebook';
import { CreateNotebookRepository } from '../../protocols/repository/notebook';

export class CreateNotebookProvider implements CreateNotebook {
  constructor(private repository: CreateNotebookRepository) {}

  async create(data: CreateNotebook.Params): Promise<CreateNotebook.Result> {
    const notebook = await this.repository.create(data);

    if (!notebook) {
      throw new Error('error to create the notebook');
    }

    return notebook;
  }
}
