import {
  ExtensionsSeed,
  NotesSeed,
  NotebooksSeed,
  UsersSeed,
} from '../infra/database/postgress/seed';

const isRevert = process.argv.includes('--revert');

const dropTables = async () => {
  try {
    await NotesSeed.drop();
    console.log('notes revert success');

    await NotebooksSeed.drop();
    console.log('notebooks revert success');

    await UsersSeed.drop();
    console.log('users revert success');

    await ExtensionsSeed.drop();
    console.log('extensions revert success');
  } catch (error) {
    console.log('[dropTables]', error);
  }
};

const createTables = async () => {
  try {
    await ExtensionsSeed.up();
    console.log('extensions up success');

    await UsersSeed.up();
    console.log('users up success');

    await NotebooksSeed.up();
    console.log('notebooks up success');

    await NotesSeed.up();
    console.log('notes up success');
  } catch (error) {
    console.log('[createTables]', error);
  }
};

if (isRevert) {
  dropTables().finally(() => {
    process.exit();
  });
} else {
  createTables().finally(() => {
    process.exit();
  });
}
