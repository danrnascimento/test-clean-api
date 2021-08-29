export interface DeleteNotebook {
  delete: (params: DeleteNotebook.Params) => Promise<DeleteNotebook.Result>;
}

export namespace DeleteNotebook {
  export type Params = string;
  export type Result = boolean;
}
