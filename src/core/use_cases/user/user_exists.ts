export interface UserExists {
  exists: (params: UserExists.Params) => Promise<UserExists.Result>;
}

export namespace UserExists {
  export type Params = string;
  export type Result = boolean;
}
