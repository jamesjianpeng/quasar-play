import { OnModuleInit } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';
import { MdbOptions } from './interface';
export declare class MdbService implements OnModuleInit {
    private options;
    private dbMap;
    constructor(options: MdbOptions);
    onModuleInit(): MdbOptions;
    getCli(): Promise<MongoClient>;
    getDb(db: string): Promise<Db>;
    getCol(db: Db, col: string): Promise<Collection>;
}
