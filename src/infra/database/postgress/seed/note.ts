import { PostgreHelper } from '../config';

const CREATE_NOTES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS notes (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    content VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    notebook_id UUID NOT NULL,
    UNIQUE (id),
    PRIMARY KEY (id),
    FOREIGN KEY (notebook_id) REFERENCES notebooks(id) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
)
`;

const DROP_NOTES_TABLE_SQL = `DROP TABLE IF EXISTS notes`;

export class NotesSeed {
  static async up() {
    try {
      await PostgreHelper.query(CREATE_NOTES_TABLE_SQL);
    } catch (error) {
      console.error('[NotesSeed up]', error);
    }
  }

  static async drop() {
    try {
      await PostgreHelper.query(DROP_NOTES_TABLE_SQL);
    } catch (error) {
      console.error('[NotesSeed drop]', error);
    }
  }
}
