import { CreateUserInput, User } from '../../entities/User';

export interface IUserRepository {
  getUserById: (id: string) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  createUser: (input: CreateUserInput) => Promise<User>;
  // deleteUser: (id: string) => Promise<boolean>;
  checkCredentials: (email: string, password: string) => Promise<boolean>;
  // addNotebook: (id: string, notebook_id: string) => Promise<boolean>;
  // removeNotebook: (id: string, notebook_id: string) => Promise<boolean>;
  // getNotebooks: (id: string) => Promise<string[]>;
}
