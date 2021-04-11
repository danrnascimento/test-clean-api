import { Request, Response } from 'express';

type RouterFunction = (req: Request, res: Response) => Promise<Response>;

export interface INoteController {
  createNote: RouterFunction;
  getNoteById: RouterFunction;
  updateNote: RouterFunction;
}
