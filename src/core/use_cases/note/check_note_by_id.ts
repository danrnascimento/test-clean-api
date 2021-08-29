export interface CheckNoteById {
  check: (params: CheckNoteById.Params) => Promise<CheckNoteById.Result>;
}

export namespace CheckNoteById {
  export type Params = string;
  export type Result = boolean;
}
