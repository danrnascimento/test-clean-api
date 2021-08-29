export interface CheckUsername {
  checkUsername: (
    params: CheckUsername.Params,
  ) => Promise<CheckUsername.Result>;
}

export namespace CheckUsername {
  export type Params = string;
  export type Result = boolean;
}
