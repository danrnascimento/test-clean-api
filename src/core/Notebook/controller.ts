import { Request, Response } from 'express';

type RouterFunction = (req: Request, res: Response) => Promise<Response>;

export interface INotebookController {
  createNotebook: RouterFunction;
  getNotebookById: RouterFunction;
  updateNotebook: RouterFunction;
}
