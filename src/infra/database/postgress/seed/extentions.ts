import { PostgressConnection } from '../config/connection';
import { PostgreHelper } from '../config/helper';

const CREATE_EXTENSION = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

const DROP_EXTENSION = `DROP EXTENSION IF EXISTS "uuid-ossp";`;

export class ExtensionsSeed {
  static async up() {
    try {
      await PostgreHelper.query(CREATE_EXTENSION);
    } catch (error) {
      console.error('[ExtensionsSeed up]', error);
    }
  }

  static async drop() {
    try {
      await PostgreHelper.query(DROP_EXTENSION);
    } catch (error) {
      console.error('[ExtensionsSeed drop]', error);
    }
  }
}
