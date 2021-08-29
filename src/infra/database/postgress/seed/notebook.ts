import { PostgressConnection } from '../config/connection';
import { PostgreHelper } from '../config/helper';

const CREATE_NOTEBOOKS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS notebooks (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NOT NULL,
    UNIQUE (id),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
)
`;

const DROP_NOTEBOOKS_TABLE_SQL = `DROP TABLE IF EXISTS notebooks`;

export class NotebooksSeed {
  static async up() {
    try {
      await PostgreHelper.query(CREATE_NOTEBOOKS_TABLE_SQL);
    } catch (error) {
      console.error('[NotebooksSeed up]', error);
    }
  }

  static async drop() {
    try {
      await PostgreHelper.query(DROP_NOTEBOOKS_TABLE_SQL);
    } catch (error) {
      console.error('[NotebooksSeed drop]', error);
    }
  }
}
