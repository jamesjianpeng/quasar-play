import { OnModuleInit } from '@nestjs/common';
import { NestjsMdbLibService } from '@smartblog/nestjs-mdb-lib';
export declare class AppService implements OnModuleInit {
    private nestjsMdbLibService;
    constructor(nestjsMdbLibService: NestjsMdbLibService);
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
