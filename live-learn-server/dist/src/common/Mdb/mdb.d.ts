import { Db, Collection } from 'mongodb';
declare const getClient: (url: string, dbName: string) => Promise<Db>;
declare const getDbCol: (dbName: string, col: string) => Promise<Collection>;
declare const getCol: (col: string) => Collection;
declare const initMdb: (env?: string) => Promise<any>;
export { getClient, getDbCol, getCol, initMdb };
