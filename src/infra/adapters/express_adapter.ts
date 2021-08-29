import { Request, Response } from 'express';
import { Controller } from '@/presentation/protocols';

export const expressRouterAdapter = (controller: Controller) => async (
  request: Request,
  response: Response,
) => {
  const body = request.body || {};
  const params = request.params || {};

  const handlerParam = {
    ...body,
    ...params,
  };

  const { status, data, error } = await controller.handle(handlerParam);

  if (error !== null) {
    response.status(status).json({ error: error.message });
    return;
  }

  response.status(status).json(data);
};
