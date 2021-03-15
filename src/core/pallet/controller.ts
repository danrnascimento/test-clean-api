import { Request, Response } from 'express';

type RouterFunction = (req: Request, res: Response) => Promise<Response>;

export interface IPalletController {
  createPallet: RouterFunction;
  getPalletById: RouterFunction;
  updatePallet: RouterFunction;
}
