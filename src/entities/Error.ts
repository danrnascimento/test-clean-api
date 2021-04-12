export class InvalidPropertyError extends Error {
  constructor(property: string, value: string) {
    super(`The ${property} "${value}" is invalid`);
  }
}
