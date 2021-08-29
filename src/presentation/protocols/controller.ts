import { HttpResponse } from './http';

export interface Controller<T = object> {
  handle: (request: T) => Promise<HttpResponse>;
}
