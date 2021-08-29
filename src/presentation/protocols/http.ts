export type HttpResponse<Result extends object = object> = {
  status: number;
  data: Result | null;
  error: Error | null;
};
