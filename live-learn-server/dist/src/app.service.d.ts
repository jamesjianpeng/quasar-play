import { OnModuleInit } from '@nestjs/common';
import { MdbService } from './common/Mdb/MdbService';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib/dist';
export declare class AppService implements OnModuleInit {
    private MdbService;
    private nestjsMdbLibService;
    constructor(MdbService: MdbService, nestjsMdbLibService: NestjsMdbLibService);
    onModuleInit(): void;
    test(): Promise<{
        hk: any[];
        sz: any[];
    }>;
    getHello(): Promise<string>;
    testLib(): Promise<string>;
    testMdb(): Promise<{
        hk: any[];
        sz: any[];
    }>;
}
