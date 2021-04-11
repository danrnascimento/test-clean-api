export type CreateUserInput = Pick<
  User,
  'email' | 'password' | 'name' | 'last_name'
>;

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class User {
  readonly id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  notebooks_ids: string[];
  created_at: Date;

  static validateEmail(email: string): boolean {
    return EMAIL_REGEX.test(email.trim().toLocaleLowerCase());
  }

  static validatePassword(password: string): boolean {
    return password.trim().length > 8;
  }
}
