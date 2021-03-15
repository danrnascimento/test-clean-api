import { Request, Response } from 'express';

type RouterFunction = (req: Request, res: Response) => Promise<Response>;

export interface IColorController {
  createColor: RouterFunction;
  getColorById: RouterFunction;
  updateColor: RouterFunction;
}
