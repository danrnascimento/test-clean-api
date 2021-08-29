import { PostgressConnection, PostgreHelper } from '../config';

const CREATE_USER_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS users (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id) 
)
`;

const DROP_USER_TABLE_SQL = `DROP TABLE IF EXISTS users`;

export class UsersSeed {
  static async up() {
    try {
      await PostgreHelper.query(CREATE_USER_TABLE_SQL);
    } catch (error) {
      console.error('[UserSeed up]', error);
    }
  }

  static async drop() {
    try {
      await PostgreHelper.query(DROP_USER_TABLE_SQL);
    } catch (error) {
      console.error('[UserSeed down]', error);
    }
  }
}
