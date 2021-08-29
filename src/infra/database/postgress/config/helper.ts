import { PostgressConnection } from './connection';

export namespace PostgreHelper {
  export const query = async <T = any>(query: string) => {
    try {
      const client = await PostgressConnection.connect();
      return client.query<T>(query);
    } catch (error) {
      console.error('[PostgreHelper]', error);
    }
  };
}
