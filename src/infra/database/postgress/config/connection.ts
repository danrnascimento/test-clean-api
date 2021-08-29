import { Client } from 'pg';

export namespace PostgressConnection {
  let client: Client | null = null;

  export const getClient = () => client;

  export const connect = async () => {
    if (client !== null) {
      return client;
    }

    client = new Client({
      user: 'postgres',
      password: '97109712',
      host: 'localhost',
      port: 15432,
      database: '',
    });

    try {
      await client.connect();
      return client;
    } catch (error) {
      console.error('[PostgressConnection connect]', error);
    }
  };
}
