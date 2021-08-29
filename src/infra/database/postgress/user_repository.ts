import { Notebook, User } from '@/core/entities';

import {
  CreateUserRepository,
  GetUserByIdRepository,
  GetUserByUsernameRepository,
  UpdateUserPasswordRepository,
  UpdateUserUsernameRepository,
  UserExistsRepository,
  CheckUsernameRepository,
} from '@/data/protocols/repository';

import { PostgreHelper } from './config/helper';

interface UserRepositoryInterface
  extends GetUserByUsernameRepository,
    CreateUserRepository,
    GetUserByIdRepository,
    UpdateUserUsernameRepository,
    UpdateUserPasswordRepository,
    UserExistsRepository,
    CheckUsernameRepository {}

type UserRepositoryData = Omit<User, 'notebooks'>;

export class UserRepository implements UserRepositoryInterface {
  async getByUsername(
    username: GetUserByUsernameRepository.Params,
  ): Promise<GetUserByUsernameRepository.Result> {
    try {
      const result = await PostgreHelper.query<UserRepositoryData>(
        `SELECT * FROM users WHERE username = '${username}';`,
      );

      const userExists = Boolean(result.rowCount);
      if (!userExists) {
        return null;
      }

      const user = result.rows[0];
      const notebooksResult = await this.getNotebooks(user.id);

      return {
        ...user,
        notebooks: notebooksResult,
      };
    } catch (error) {
      console.error('[UserRepository] [getByUsername]', error);
      return null;
    }
  }

  async create(
    data: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Result> {
    try {
      const result = await PostgreHelper.query<UserRepositoryData>(
        `INSERT INTO users (username, password) VALUES ('${data.username}', '${data.password}') RETURNING *;`,
      );

      const userCreated = Boolean(result.rowCount);
      if (!userCreated) {
        return null;
      }

      const user: User = {
        ...result.rows[0],
        notebooks: [],
      };

      return user;
    } catch (error) {
      console.error('[UserRepository] [create]', error);
      return null;
    }
  }

  async get(
    id: GetUserByIdRepository.Params,
  ): Promise<GetUserByIdRepository.Result> {
    try {
      const result = await PostgreHelper.query<UserRepositoryData>(
        `SELECT * FROM users WHERE id = '${id}';`,
      );

      const userExists = Boolean(result.rowCount);
      if (!userExists) {
        return null;
      }

      const resultNotebooks = await this.getNotebooks(id);

      const user: User = {
        ...result.rows[0],
        notebooks: resultNotebooks,
      };

      return user;
    } catch (error) {
      console.error('[UserRepository] [get]', error);
      return null;
    }
  }

  async updatePassword(
    data: UpdateUserPasswordRepository.Params,
  ): Promise<UpdateUserPasswordRepository.Result> {
    try {
      const result = await PostgreHelper.query<UserRepositoryData>(
        `UPDATE users SET password = '${data.password}' WHERE id = '${data.id}' RETURNING *;`,
      );

      const userExists = Boolean(result.rowCount);
      if (!userExists) {
        return null;
      }

      const notebooksResult = await this.getNotebooks(data.id);

      const user: User = {
        ...result.rows[0],
        notebooks: notebooksResult,
      };

      return user;
    } catch (error) {
      console.error('[UserRepository] [updatePassword]', error);
      return null;
    }
  }

  async updateUsername(
    data: UpdateUserUsernameRepository.Params,
  ): Promise<UpdateUserUsernameRepository.Result> {
    try {
      const result = await PostgreHelper.query<UserRepositoryData>(
        `UPDATE users SET username = '${data.username}' WHERE id = '${data.id}' RETURNING *;`,
      );

      const userExists = Boolean(result.rowCount);
      if (!userExists) {
        return null;
      }

      const notebooksResult = await this.getNotebooks(data.id);

      const user: User = {
        ...result.rows[0],
        notebooks: notebooksResult,
      };

      return user;
    } catch (error) {
      console.error('[UserRepository] [updateUsername]', error);
      return null;
    }
  }

  async exists(
    id: UserExistsRepository.Params,
  ): Promise<UserExistsRepository.Result> {
    try {
      const result = await PostgreHelper.query<boolean>(
        `SELECT 1 FROM users WHERE id = '${id}';`,
      );

      return Boolean(result.rows[0]);
    } catch (error) {
      console.error('[UserRepository] [exists]', error);
      return null;
    }
  }

  async checkUsername(
    username: CheckUsernameRepository.Params,
  ): Promise<CheckUsernameRepository.Result> {
    try {
      const result = await PostgreHelper.query<boolean>(
        `SELECT 1 FROM users WHERE username = '${username}';`,
      );

      return Boolean(result.rows[0]);
    } catch (error) {
      console.error('[UserRepository] [checkUsername]', error);
      return null;
    }
  }

  private async getNotebooks(user_id: string): Promise<Notebook[]> {
    const resultNotes = await PostgreHelper.query<Notebook>(
      `SELECT * FROM notebooks WHERE user_id = '${user_id}';`,
    );

    return [...(resultNotes.rows || [])];
  }
}
