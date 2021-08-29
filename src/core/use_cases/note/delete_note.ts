export interface DeleteNote {
  delete: (params: DeleteNote.Params) => Promise<DeleteNote.Result>;
}

export namespace DeleteNote {
  export type Params = string;
  export type Result = boolean;
}
