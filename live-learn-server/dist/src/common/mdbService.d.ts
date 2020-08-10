import { OnModuleInit } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';
export declare class MdbService implements OnModuleInit {
    private dbMap;
    onModuleInit(): void;
    getCli(): Promise<MongoClient>;
    getDb(db: string): Promise<Db>;
    getCol(db: Db, col: string): Promise<Collection>;
}
