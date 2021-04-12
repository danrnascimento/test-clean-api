import { InvalidPropertyError } from '../Error';

export class UserNameError extends InvalidPropertyError {
  constructor(name: string) {
    super('name', name);
  }
}

export class UserLastNameError extends InvalidPropertyError {
  constructor(last_name: string) {
    super('last_name', last_name);
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
