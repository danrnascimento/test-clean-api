import { Request, Response } from 'express';

export type UserRouterMatcher = (
  req: Request,
  response: Response,
) => Promise<Response>;

export interface IUserController {
  getUserById: UserRouterMatcher;
  createUser: UserRouterMatcher;
}
