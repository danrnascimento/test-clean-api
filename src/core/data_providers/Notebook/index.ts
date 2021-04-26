import Notebook, { CreateNotebookInput } from '../../entities/Notebook';

export interface INotebookDataProvider {
  getById: (id: string) => Promise<Notebook>;
  createNotebook: (input: CreateNotebookInput) => Promise<Notebook>;
  updateNotebook: (
    id: string,
    input: Partial<CreateNotebookInput>,
  ) => Promise<Notebook>;
  deleteNotebook: (id: string) => Promise<boolean>;
  addNote: (id: string, note_id: string) => Promise<Notebook>;
  removeNote: (id: string, note_id: string) => Promise<Notebook>;
}
