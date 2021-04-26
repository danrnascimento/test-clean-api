import { INotebookDataProvider } from '../../data_providers/Notebook';
import Notebook, { CreateNotebookInput } from '../../entities/Notebook';

export interface INotebookCases {
  getNotebok: (id: string) => Promise<Notebook>;
  createNotebook: (input: CreateNotebookInput) => Promise<Notebook>;
  updateNotebook: (
    id: string,
    input: Partial<CreateNotebookInput>,
  ) => Promise<Notebook>;
  deleteNotebook: (id: string) => Promise<boolean>;
  addNoteToNotebook: (id: string, note_id: string) => Promise<Notebook>;
  removeNoteFromNotebook: (id: string, note_id: string) => Promise<Notebook>;
}

export class NotebookCases implements INotebookCases {
  constructor(private repository: INotebookDataProvider) {}

  public async getNotebok(id: string) {
    try {
      const notebook = await this.repository.getById(id);
      return notebook;
    } catch {
      throw new Error('notebook not found');
    }
  }

  public async createNotebook(input: CreateNotebookInput) {
    try {
      const notebook = await this.repository.createNotebook(input);
      return notebook;
    } catch {
      throw new Error('error to create');
    }
  }

  public async deleteNotebook(id: string) {
    try {
      const success = await this.repository.deleteNotebook(id);

      if (!success) {
        throw new Error('error to delete');
      }

      return success;
    } catch {
      throw new Error('error to delete');
    }
  }

  public async updateNotebook(id: string, input: Partial<CreateNotebookInput>) {
    try {
      const notebook = await this.repository.updateNotebook(id, input);
      return notebook;
    } catch {
      throw new Error('error to delete');
    }
  }

  public async addNoteToNotebook(id: string, note_id: string) {
    try {
      const notebook = await this.repository.addNote(id, note_id);
      return notebook;
    } catch {
      throw new Error('error to add note');
    }
  }

  public async removeNoteFromNotebook(id: string, note_id: string) {
    try {
      const notebook = await this.repository.removeNote(id, note_id);
      return notebook;
    } catch {
      throw new Error('error to add note');
    }
  }
}
