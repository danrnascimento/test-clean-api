import { InvalidPropertyError } from '../Error';

export class UserNameError extends InvalidPropertyError {
  constructor(name: string) {
    super('name', name);
  }
}

export class UserPasswordError extends InvalidPropertyError {
  constructor(password: string) {
    super('password', password);
  }
}

export class UserEmailError extends InvalidPropertyError {
  constructor(email: string) {
    super('email', email);
  }
}
