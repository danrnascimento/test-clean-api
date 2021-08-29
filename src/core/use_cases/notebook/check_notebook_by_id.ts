export interface CheckNotebookById {
  check: (
    params: CheckNotebookById.Params,
  ) => Promise<CheckNotebookById.Result>;
}

export namespace CheckNotebookById {
  export type Params = string;
  export type Result = boolean;
}
